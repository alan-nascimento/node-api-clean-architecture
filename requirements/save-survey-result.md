# Reply survey

> ## Success story

1. ✅ Receive a **PUT** request on route **/api/surveys/{survey_id}/results**
2. ✅ Validates if the request was made by a **user**
3. ✅ Validates the **survey_id** parameter
4. ✅ Validates that the **answer** field is a valid answer
5. ✅ **Create** a survey result with the data provided if you do not have a record
6. ✅ **Updates** a survey result with the data provided if you already have a record
7. ✅ Returns **200** with survey result data

> ## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if not a user
3. ✅ Returns error **403** if the survey_id passed in the URL is invalid
4. ✅ Returns error **403** if the response sent by the client is an invalid response
5. ✅ Returns error **500** if there is an error when trying to create the survey result
6. ✅ Returns error **500** if there is an error when trying to update the survey result
7. ✅ Returns error **500** if there is an error when trying to load the survey

