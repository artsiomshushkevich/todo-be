up:
	docker compose --profile dev --env-file ./.env up 

kill:
	docker kill todo-be-dev todo-db-dev