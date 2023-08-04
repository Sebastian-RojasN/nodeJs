const { Client } = require("pg");

const obtener = async () => {
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "HumanResources",
        password: "1234",
        port: 5432,
    });

    try {
        await client.connect();

        const res = await client.query(`SELECT
        edh.businessentityid,
        e.nationalidnumber, --(tabla employee)
        edh.departmentid,
        d.name, --(del departamento /  tabla department)
        d.groupname, --( tabla department)
        edh.startdate,
        edh.enddate
    FROM
        employeedepartmenthistory edh
    INNER JOIN
        department d ON edh.departmentid = d.departmentid
    INNER JOIN
        employee e ON edh.businessentityid = e.businessentityid`);
        const result = res.rows;

        return result;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error; // Lanza el error para que pueda ser capturado en el llamado a la función
    } finally {
        await client.end(); // Asegúrate de cerrar la conexión con la base de datos
    }
};

module.exports = obtener;
