# Login

> ## Success story

1. ✅ Receive a **POST** request on route **/api/login**
2. ✅ Validates mandatory data **email** and **password**
3. ✅ Validate that the **email** field is a valid email
4. ✅ **Search** the user with the provided email and password
5. ✅ Generates an **access token** from the user ID
6. ✅ **Updates** user data with the generated access token
7. ✅ Returns **200** with access token and user name

> ## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **400** if email or password is not provided by the client
3. ✅ Returns error **400** if the email field is an invalid email
4. ✅ Returns error **401** if it does not find a user with the data provided
5. ✅ Returns error **500** if there is an error when trying to generate the access token
6. ✅ Returns error **500** if there is an error when trying to update the user with the generated access token
