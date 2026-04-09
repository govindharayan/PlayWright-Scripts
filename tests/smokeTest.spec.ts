import {test} from '../utility/fixtures';
import { expect } from '../utility/custom-expected';
import { APILogger } from '../utility/logger';
import { createToken } from '../helpers/createToken';

let token: string;

// test.beforeAll(async ({api,config}) => {
//   token = await createToken(config.userEmail, config.userPassword);
//   console.log("token:   ", token);
  
// });


test('Get Tags from get request', async ({api}) => {
    const response = await api
                                .path('/articles')
                                .params({limit: 2, offset: 0})
                                .getRequest(200)

console.log(response);

expect(response.articles.length).toBeLessThanOrEqual(2);
expect(response.articles.length).toBeGreaterThan(0);    

});         


test('Framework Test', async ({api}) => {
    const response = await api
                                .path('/tags')
                                .getRequest(200)

    console.log(response);
      expect(response.tags.length).toBeLessThanOrEqual(10);
      expect(response.tags.length).toBeGreaterThan(0);
})


test('Create Update and Delete Article', async ({api}) => {
    const postResponse = await api
                                .path('/articles/')
                                //.headers({Authorization: `Token ${token}`})
                                //.clearAuth()
                                .body({article: {title: "My Article 1", description: "This is a test article", body: "This is the content of the article"}})
                                .postRequest(201)

  expect(postResponse.article.title).shouldEqual("My Article 1");
  const articleid = postResponse.article.slug;



  const updateResponse = await api
                              .path(`/articles/${articleid}`)
                              // .headers({Authorization: `Token ${token}`})
                              .body({article: {title: "My Article 1 Updated", description: "This is a test article", body: "This is the content of the article"}})
                              .putRequest(200)

    expect(updateResponse.article.title).shouldEqual("My Article 1 Updated");

    const updatedArticleId = updateResponse.article.slug;
    

    const deleteResponse = await api
                                .path(`/articles/${updatedArticleId}`)
                                //.headers({Authorization: `Token ${token}`})
                                .deleteRequest(204)
                                
    const validateDeleteResponse = await api
                                    .path(`/articles/`)
                                   // .headers({Authorization: `Token ${token}`})
                                    .getRequest(200)

    expect(validateDeleteResponse.articles[0].title).not.shouldEqual("My Article 1 Updated");



})



test('test to check the logging mechanism', async ({}) => {
  const logger = new APILogger();
  logger.logRequest('GET', '/articles', {'Content-Type': 'application/json'}, {details: 'Request body example'});
  logger.logResponse(200, {message: 'Response body example'});
  const logs = logger.getRecentLogs();
  console.log(logs);
})