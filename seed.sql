DROP TABLE movie;
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
INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ('fast furios',null,'150 minute','action,drama','malek','malek','18');
INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ('fast furios',null,'150 minute','action,drama','ahmad','ahmad','18');
INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ('fast furios',null,'150 minute','action,drama','murad','murad','18');
INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ('fast furios',null,'150 minute','action,drama','loay','loay','18');
INSERT INTO movie (title,image_path,runtime,gener,actors,plot,imdbrating) values ('fast furios',null,'150 minute','action,drama','malek','malek','18');
