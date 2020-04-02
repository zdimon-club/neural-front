# Documentation

    npm run docserve

# Linting

    ng lint

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Server with remote interaction.

    ng serve -c local

## Fix watching on Ubuntu

    sudo sysctl fs.inotify.max_user_watches=524288
    sudo sysctl -p --system
