up:
	docker compose --profile dev --env-file ./.env up --build

down:
	docker compose --profile dev down