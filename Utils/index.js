import React, { useState } from "react";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

function extractImageUrls(imageArray) {
  return imageArray.map((image) => image.url);
}

export const REGISTER_USER = async (signUp) => {
  const { name, email, password, confirmPassword } = signUp;

  if (!name || !email || !password || !confirmPassword)
    return "Data is missing";

  if (password != confirmPassword) return "Password is not matching";

  const response = await axios({
    method: "POST",
    url: "/api/auth/register",
    withCredentials: true,
    data: {
      username: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  });

  if (response.status == 201) {
    window.location.href = "/";
  }
};

export const LOGIN_USER = async (login) => {
  const { email, password } = login;
  if (!email || !password) return "Data is missing";

  const response = await axios({
    method: "POST",
    url: "/api/auth/login",
    withCredentials: true,
    data: {
      email: email,
      password: password,
    },
  });

  if (response.status == 200) {
    window.location.href = "/";
  }
};

export const LOGOUT = async (router) => {
  const response = await axios({
    method: "GET",
    url: "/api/auth/logout",
    withCredentials: true,
  });

  if (response.status == 200) {
    window.location.href = "/";
  }
};

export const CHECK_AUTH = async () => {
  const response = await axios({
    method: "GET",
    url: "/api/auth/refetch",
    withCredentials: true,
  });

  let user;
  if (response.status === 200) {
    user = response.data;
    // console.log("User from CHECK_AUTH:", user);
  }

  return user;
};

export const LIKE_POST = async (postID) => {
  const currentUser = await CHECK_AUTH();
  const response = await axios({
    method: "POST",
    url: `/api/post/like/${postID}`,
    withCredentials: true,
    data: {
      userId: currentUser._id,
    },
  });

  if (response.status == 200) {
    return response;
  }
};

export const DISLIKE_POST = async (postID) => {
  const currentUser = await CHECK_AUTH();
  const response = await axios({
    method: "POST",
    url: `/api/post/dislike/${postID}`,
    withCredentials: true,
    data: {
      userId: currentUser._id,
    },
  });

  if (response.status == 200) {
    return response;
  }
};

export const IMAGE_GENERATOR_V3 = async (promptv3) => {
  try {
    const currentUser = await CHECK_AUTH();
    if (!currentUser || !currentUser._id) {
      return "User not authenticated.";
    }

    const { prompt, negativePrompt, size, style } = promptv3;
    // console.log("Request Data:", { prompt, negativePrompt, size, style });

    if (!prompt || !negativePrompt || !size || !style) {
      return "Data is Missing";
    }

    const LOWERCASE = style.toLowerCase();

    // console.log(`Making request to: /api/post/create/v3/${currentUser._id}`);

    const AIImage = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: size,
      n: 1,
    });

    if (AIImage.data && AIImage.data[0] && AIImage.data[0].url) {
      const response = await axios({
        method: "POST",
        url: `/api/post/create/v3/${currentUser._id}`,
        withCredentials: true,
        data: {
          prompt,
          negativePrompt,
          revisedPrompt: AIImage.data[0].revised_prompt,
          size,
          style,
          imageURL: AIImage.data[0].url,
        },
      });
      // console.log("Response from backend:", response);

      if (response.status === 201) {
        if (currentUser.credit < 1) {
          return "Not enough credits.";
        }

        const creditResponse = await axios({
          method: "PUT",
          url: `/api/user/credit/${currentUser._id}`,
          withCredentials: true,
          data: {
            credit: currentUser.credit - 1,
          },
        });

        // console.log("Credit Updated:", creditResponse);
        return response;
      }
    } else {
      throw new Error("No image URL returned from OpenAI.");
    }
  } catch (error) {
    console.error("Error generating image:", error.message);
    return `Error generating image: ${error.message}`;
  }
};

export const IMAGE_GENERATOR_V2 = async (promptv2) => {
  const currentUser = await CHECK_AUTH();

  const { prompt, negativePrompt, size, n } = promptv2;
  // console.log("Request Data:", { prompt, negativePrompt, size, style });
  if (!prompt || !negativePrompt || !size) {
    return "Data is Missing";
  }
  // console.log(`Making request to: /api/post/create/v2/${currentUser._id}`);
  const AIImage = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    size: size,
    n: Number(n),
  });

  const imageUrls = extractImageUrls(AIImage.data);

  if (imageUrls.length) {
    const response = await axios({
      method: "POST",
      url: `/api/post/create/v2/${currentUser._id}`,
      withCredentials: true,
      data: {
        prompt,
        negativePrompt: negativePrompt,
        size,
        n,
        imageUrls: imageUrls,
      },
    });
    console.log("Response from backend:", response);
    if (response.status == 201) {
      const credit = await axios({
        method: "PUT",
        url: `/api/user/credit/${currentUser._id}`,
        withCredentials: true,
        data: {
          credit: Number(currentUser?.credit) - 1,
        },
      });
      return response;
    }
  }
};

export const GET_AI_IMAGES = async () => {
  const response = await axios({
    method: "GET",
    url: `/api/post/all`,
    withCredentials: true,
  });

  if (response.status == 200) {
    // console.log("Fetched Posts: ", response);
    return response.data.posts;
  }
};

export const GET_USER_AI_IMAGES = async (userId) => {
  if (!userId) {
    console.error("User ID is undefined. Cannot fetch AI images.");
    return null;
  }

  try {
    const response = await axios({
      method: "GET",
      url: `/api/post/user/${userId}`,
    });

    if (response.status === 200) {
      return response.data.posts;
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user AI images:", error);
    throw error;
  }
};

export const GET_SINGLE_POST = async (postId) => {
  const response = await axios({
    method: "GET",
    url: `/api/post/single/${postId}`,
  });

  if (response.status == 200) {
    return response.data.returnPost;
  }
};

export const DELETE_POST = async (postId) => {
  const response = await axios({
    method: "DELETE",
    url: `/api/post/delete/${postId}`,
  });

  if (response.status == 200) {
    return response;
  }
};

export const BUYING_CREDIT = async (CREDIT) => {
  const currentUser = await CHECK_AUTH();

  const response = await axios({
    method: "PUT",
    url: `/api/user/credit/${currentUser._id}`,
    withCredentials: true,
    data: {
      credit: Number(currentUser?.credit) + Number(CREDIT),
    },
  });

  if (response.status == 200) {
    return response;
  }
};
