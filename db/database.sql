/*drop database fifa;
create database fifa;*/
create database if not exists fifa;
use fifa;

drop table if exists Player;

create table Player(
	id_player int NOT NULL AUTO_INCREMENT,
    first_name nvarchar(50),
    last_name nvarchar(50),
    primary key(id_player)
);

drop table if exists Tipo;

create table Tipo(
	id_tipo int NOT NULL AUTO_INCREMENT,
    tipo nvarchar(50),
    primary key(id_tipo)
);

drop table if exists FaceStats;

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

drop table if exists Pais;

create table Pais(
    id_pais int NOT NULL AUTO_INCREMENT,
    nombre_pais nvarchar(50),
    primary key(id_pais)
);

drop table if exists Liga;

create table Liga(
    id_liga int NOT NULL AUTO_INCREMENT,
    nombre_liga nvarchar(50),
    primary key(id_liga)
);

drop table if exists Equipo;

create table Equipo(
    id_equipo int NOT NULL AUTO_INCREMENT,
    id_liga int,
    nombre_equipo nvarchar(50),
    primary key(id_equipo),
    foreign key(id_liga) references Liga(id_liga)
);

drop table if exists Carta;

create table Carta(
	id_carta int NOT NULL AUTO_INCREMENT,
    id_player int,
    id_tipo int,
    id_face_stats int,
    id_equipo int,
    id_nacionalidad int,
    posicion nvarchar(3),
    skills smallint,
    weak_foot smallint,
    rating smallint,
    price_range_min int,
    price_range_max int,
    primary key(id_carta),
    foreign key(id_player) references Player(id_player),
    foreign key(id_tipo) references Tipo(id_tipo),
    foreign key(id_face_stats) references FaceStats(id_face_stats),
    foreign key(id_equipo) references Equipo(id_equipo),
    foreign key(id_nacionalidad) references Pais(id_pais)
);

drop table if exists Usuario;

create table Usuario(
	id_usuario int NOT NULL AUTO_INCREMENT,
    fondos int,
    primary key(id_usuario)
);

drop table if exists CartaDeUsuario;

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

drop table if exists Publicacion;

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














