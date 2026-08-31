## Entity: Especialidades
Atributo        |  Tipo           |  Notas
id_especialidad      Numero Entero      primary key
name                    texto              unio
descipcion               texto             notnull  

## Entity: Empleados

Atributo        |  Tipo                 |  Notas
id_empleado       Numero Entero            [PK]
name_empleado     string                   notnull
appaterno         string                   notnull  
apmaterno         string                   notnull  
telefono          string                   notnull
email             string                   notnull
id_rol            numero entero             [FK]
id_especialidad   numero entero             [FK]



## Entity: Pacientes

Atributo          |  Tipo                 |  Notas
id_paciente           Numero Entero             [PK]
name_paciente     string                   notnull
appaterno         string                   notnull  
apmaterno         string                   notnull  
telefono          string                   notnull
email             string                   notnull
fecha_nacimiento  string                   notnull
genero            string                   notnull
fecha_de_registro fecha                    deaful(now)

## Entity: citas

Atributo            |  Tipo                 |  Notas
id_cita               Numero Entero           [PK]
id_paciente           Numero Entero           [FK]
id_medico             Numero Entero           [FK]
id_estado             Numero Entero           [FK]
fecha_creacion        fecha                    deaful(now)
fecha_hora            fecha                    not null

## Entity: Estado de citas

Atributo        |  Tipo                 |  Notas
id_estado         Numero Entero            [PK]
name                texto                    NOT NULL 
descripcion         texto                    NOT NULL


## Entity: Rol

Atributo        |  Tipo                 |  Notas
id_rol             Numero Entero            [PK]
name_rol          texto                    NOT NULL 
descripcion       texto                    NOT NULL



un empleado puede tener un solo rol y un rol puede tener mucho empleados 
un medico puede tener una especialidad y una especialidad puede tener muchos medicos
un paciente puede tener muchas citas pero una cita solo tiene un paciente
un medico puede tener muchas citas pero una cita solo tiene un medico 
un estado puede tener muchas citas pero una cita solo tiene un estado
