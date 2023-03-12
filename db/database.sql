drop database fifa;
create database fifa;
use fifa;

create table Player(
	id_player int NOT NULL AUTO_INCREMENT,
    first_name nvarchar(50),
    last_name nvarchar(50),
    primary key(id_player)
);

create table Tipo(
	id_tipo int NOT NULL AUTO_INCREMENT,
    tipo nvarchar(50),
    primary key(id_tipo)
);

create table FaceStats(
	id_face_stats int NOT NULL AUTO_INCREMENT,
    pace int,
    shooting int,
    passing int,
    dribbling int,
    defense int,
    physical int,
    primary key(id_face_stats)
);

create table Carta(
	id_carta int NOT NULL AUTO_INCREMENT,
    id_player int,
    id_tipo int,
    id_face_stats int,
    posicion nvarchar(3),
    skills smallint,
    weak_foot smallint,
    rating smallint,
    price_range_min int,
    price_range_max int,
    primary key(id_carta),
    foreign key(id_player) references Player(id_player),
    foreign key(id_tipo) references Tipo(id_tipo),
    foreign key(id_face_stats) references FaceStats(id_face_stats)
);

create table Usuario(
	id_usuario int NOT NULL AUTO_INCREMENT,
    fondos int,
    primary key(id_usuario)
);

create table CartaDeUsuario(
	id_carta int,
    id_usuario int,
    partidos_jugados int,
    goles int,
    asistencias int,
    amarillas int,
    rojas int,
    primary key(id_carta, id_usuario),
    foreign key(id_carta) references Carta(id_carta),
    foreign key(id_usuario) references Usuario(id_usuario)
);

create table Publicacion(
	id_publicacion int NOT NULL AUTO_INCREMENT,
    id_carta int,
    id_usuario int,
    precio int,
    tiempo_disponible nvarchar(50),
    primary key(id_publicacion),
    foreign key(id_carta) references CartaDeUsuario(id_carta),
    foreign key(id_usuario) references CartaDeUsuario(id_usuario)
);














