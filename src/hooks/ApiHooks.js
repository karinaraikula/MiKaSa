/* eslint-disable indent */
import {useEffect, useState} from 'react';
import {appID, baseUrl} from '../utils/variables';

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.message;
      throw new Error(message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useMedia = (showAllFiles, userId, tag = false) => {
  const [update, setUpdate] = useState(false);
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMedia = async () => {
    try {
      setLoading(true);
      let media = await useTag().getTag(!tag ? appID : tag + appID);
      // jos !showAllFiles, filteröi kirjautuneen
      // käyttäjän tiedostot media taulukkoon
      if (!showAllFiles) {
        media = media.filter((file) => file.user_id === userId);
      }

      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
        }),
      );

      setMediaArray(allFiles);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, [userId, update]);

  const postMedia = async (formdata, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formdata,
      };
      return await fetchJson(baseUrl + 'media', fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (fileId, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
    } finally {
      setUpdate(!update);
    }
  };

  const putMedia = async (fileId, data, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  return {mediaArray, postMedia, deleteMedia, putMedia, loading};
};

const useUser = () => {
  const getUser = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/user', fetchOptions);
  };

  const getUsername = async (username) => {
    const checkUser = await fetchJson(baseUrl + 'users/username/' + username);
    return checkUser.available;
  };

  const getUserById = async (userId, token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/' + userId, fetchOptions);
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'users', fetchOptions);
  };

  return {getUser, postUser, getUsername, getUserById};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'login', fetchOptions);
  };
  return {postLogin};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await fetchJson(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('No results');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'tags', fetchOptions);
  };
  return {getTag, postTag};
};

// https://media.mw.metropolia.fi/wbma/docs/#api-Favourite-GetFileFavourites
const useFavourite = (avain = '') => {
  const [favouriteMedia, setFavourites] = useState([]);
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({file_id: fileId}),
    };
    return await fetchJson(`${baseUrl}favourites`, options);
  };

  const getFavouritesByFileId = async (fileId) => {
    return await fetchJson(`${baseUrl}favourites/file/${fileId}`);
  };

  const getFavourites = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': avain,
      },
    };
    return await fetchJson(`${baseUrl}favourites`, options);
  };

  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(`${baseUrl}favourites/file/${fileId}`, options);
  };
  useEffect(() => {
    const fetchMoro = async () => {
      const moro = await getFavourites();
      console.log(moro);
      setFavourites(moro);
    };
    if (avain.length > 0) {
      fetchMoro();
    }
  }, []);

  return {
    postFavourite,
    getFavouritesByFileId,
    deleteFavourite,
    getFavourites,
    favouriteMedia,
  };
};

export {useMedia, useLogin, useUser, useTag, useFavourite};
