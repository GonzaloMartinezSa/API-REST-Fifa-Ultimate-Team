create table Player(
	  id_player INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name nvarchar(50),
    last_name nvarchar(50)
);

create table Tipo(
	  id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo nvarchar(50)
);

create table FaceStats(
	  id_face_stats INTEGER PRIMARY KEY AUTOINCREMENT,
    pace int,
    shooting int,
    passing int,
    dribbling int,
    defense int,
    physical int
);

create table Pais(
    id_pais INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_pais nvarchar(50)
);

create table Liga(
    id_liga INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_liga nvarchar(50)
);

create table Equipo(
    id_equipo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_liga int,
    nombre_equipo nvarchar(50),
    foreign key(id_liga) references Liga(id_liga)
);

create table Carta(
	  id_carta INTEGER PRIMARY KEY AUTOINCREMENT,
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
    foreign key(id_player) references Player(id_player),
    foreign key(id_tipo) references Tipo(id_tipo),
    foreign key(id_face_stats) references FaceStats(id_face_stats),
    foreign key(id_equipo) references Equipo(id_equipo),
    foreign key(id_nacionalidad) references Pais(id_pais)
);

create table Usuario(
	  id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    fondos int
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
	  id_publicacion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_carta int,
    id_usuario int,
    precio int,
    tiempo_disponible nvarchar(50),
    foreign key(id_carta) references CartaDeUsuario(id_carta),
    foreign key(id_usuario) references CartaDeUsuario(id_usuario)
);