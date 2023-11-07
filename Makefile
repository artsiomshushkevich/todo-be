up:
	docker compose --profile dev --env-file ./.env up --build -V

down:
	docker compose --profile dev down