CREATE TABLE IF NOT EXISTS movie(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    image_path varchar(255),
    runtime varchar(255),
    gener varchar(255),
    actors varchar(255),
    plot varchar(255),
    imdbrating varchar(255)
);