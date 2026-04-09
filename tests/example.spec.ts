import { test, expect } from '@playwright/test';

let token: string; 

test.beforeAll(async ({request}) => {
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      "user": {
        "email": "harayangovind@gmail.com",
        "password": "Govind@11022002"
      }
    }
  });
  console.log(articleResponse.status());
  const articleResponseBody = await articleResponse.json();
  console.log(articleResponseBody);

  token = articleResponseBody.user.token;
  
});
test('Get Tags from get request', async ({ request }) => {
  const tagResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags?limit=2');
  const tagResponseBody = await tagResponse.json();
  expect(tagResponse.status()).toBe(200);
  expect(tagResponse.status()).toEqual(200);
  expect(tagResponse.statusText()).toBe('OK');
  expect(tagResponse.status()).not.toBe(400);
  expect(tagResponseBody.tags.length).toBeLessThanOrEqual(10);
  expect(tagResponseBody.tags.length).toBeGreaterThan(0);

  console.log(tagResponseBody);
});
test('Create and Delete Article', async ({ request }) => {

    const postResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title": "My First Article",
        "description": "This is a simple description",
        "body": "This is the content of my first article."
      }
    },
      headers: {
        Authorization: `Token ${token}`
    },
  })
  console.log(postResponse.status())
  const PostResponseBody = await postResponse.json()
  console.log(PostResponseBody);
  expect(postResponse.status()).toBe(201);
  expect(PostResponseBody.article.title).toBe("My First Article");
  const articleid = PostResponseBody.article.slug;
  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleid}`, {
    headers: {
      Authorization: `Token ${token}`
    },
  });
  console.log(deleteResponse.status());
  expect(deleteResponse.status()).toBe(204);
});



test('Create, Update, and Delete Article', async ({ request }) => {
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      "user": {
        "email": "harayangovind@gmail.com",
        "password": "Govind@11022002"
      }
    }
  });
  console.log(articleResponse.status());
  const articleResponseBody = await articleResponse.json();
  console.log(articleResponseBody);

  token = articleResponseBody.user.token;
    const postResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title": "My First Article",
        "description": "This is a simple description",
        "body": "This is the content of my first article."
      }
    },
      headers: {
        Authorization: `Token ${token}`
    },
  })
  console.log(postResponse.status())
  const PostResponseBody = await postResponse.json()
  console.log(PostResponseBody);
  expect(postResponse.status()).toBe(201);
  expect(PostResponseBody.article.title).toBe("My First Article");
  const articleid = PostResponseBody.article.slug;

  const updateResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${articleid}`, {
    data: {
      "article": {
        "title": "My First Article Modified",
        "description": "This is an updated description"
      }
    },
    headers: {
      Authorization: `Token ${token}`
    }
  });
  console.log(updateResponse.status());
  const UpdateResponseBody = await updateResponse.json();
  console.log(UpdateResponseBody);
  const updatedArticleId = UpdateResponseBody.article.slug;
  expect(updateResponse.status()).toBe(200);
  expect(UpdateResponseBody.article.title).toBe("My First Article Modified");

  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updatedArticleId}`, {
    headers: {
      Authorization: `Token ${token}`
    },
  });
  console.log(deleteResponse.status());
  expect(deleteResponse.status()).toBe(204);
});
