# Create survey

> ## Success story

1. ✅ Receive a **POST** request on route **/api/surveys**
2. ✅ Validates if the request was made by an **admin**
3. ✅ Validates mandatory data **question** and **answers**
4. ✅ **Create** a survey with the data provided
5. ✅ Returns **204**, without data

> ## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if the user is not admin
3. ✅ Returns error **400** if question or answers are not provided by the client
4. ✅ Returns error **500** if there is an error when trying to create the survey
