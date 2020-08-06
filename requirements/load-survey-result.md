# Survey result

> ## Success story

1. ✅ Receive a **GET** request on route **/api/surveys/{survey_id}/results**
2. ✅ Validates if the request was made by a **user**
3. ✅ Returns **200** with survey result data

> ## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **403** if not a user
3. ✅ Returns error **500** if there is an error when trying to list the survey result
