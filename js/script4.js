
console.log("criscris")

const map = L.map('map').setView([-9.061512787999959, -76.07550594599996], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    atribution: '&copy <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)


// const geojsonData = await fetch("../data/azfaltado.geojson").then(r => r.json());

// const filtro = [ ["PE-34A","AREQUIPA"],["PE-1S","AREQUIPA"],["PE-36A","MOQUEGUA"],["PE-36B","MOQUEGUA"],["PE-1S","MOQUEGUA"]]
// L.geoJSON(geojsonData, {
//     style: function (feature) {
//         return colorPropertie(feature.properties,filtro)
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`
//                     <strong>${feature.properties.cCodRuta}</strong><br>
//                     COD: ${feature.properties.cCodRuta}<br>
//                     DEPA: ${feature.properties.cDepartame}
//                 `);
//     }
// }).addTo(map);

// NOMBRES - CODIGOS
const depatamentoNombreCodigos = await fetch("data/base/dataDepartamentoNombreCod.json").then(r => r.json());
const provinciasNombreCodigos = await fetch("data/base/dataProvinciasNombreCod.json").then(r => r.json());
const depatamentoCodigoNombre = await fetch("data/base/dataDepartamentoCodNombre.json").then(r => r.json());
const provinciasCodigoNombre = await fetch("data/base/dataProvinciasCodNombre.json").then(r => r.json());

// DATA GEOJSON
const geojsonDataDepartamentos = await fetch("data/departamentos03.geojson").then(r => r.json());
const geojsonDataProvincias = await fetch("data/provincias03.geojson").then(r => r.json());
const geojsonDataDistritos = await fetch("data/distritos03.geojson").then(r => r.json());




// ---------------------------------
const noAcogidoDepas = [
    {
        "departamentos": ["LIMA", "ANCASH", "LAMBAYEQUE","HUANUCO","PASCO","JUNIN","AYACUCHO",
            "TUMBES", "ICA", "AREQUIPA", "MOQUEGUA", "TACNA", "PUNO","CUSCO","HUANCAVELICA",
            "APURIMAC", "PIURA", "CAJAMARCA", "LA LIBERTAD"]
    }
]
const geoNoAcogidoDepas = obtenerFiltradoData(noAcogidoDepas)
L.geoJSON(geoNoAcogidoDepas, {
    style: {
        color: 'cadetblue',
        weight: 12
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("NO ACOGIDO", feature));
    }
}).addTo(map);

// ---------------------------------
const noAcogidoProvincias = [
    {
        "departamento": "HUANUCO",
        "provincias": ["HUACAYBAMBA", "DOS DE MAYO", "YAROWILCA", "LAURICOCHA","HUANUCO","AMBO","HUAMALIES"]
    },
    {
        "departamento": "AYACUCHO",
        "provincias": ["HUANTA","LA MAR"]
    }
]
const geoNoAcogidoProvincias = obtenerFiltradoData(noAcogidoProvincias)
L.geoJSON(geoNoAcogidoProvincias, {
    style: {
        color: 'cadetblue',
        weight: 7
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("NO ACOGIDO", feature));
    }
}).addTo(map);

// ---------------------------------
const noAcogidoDistrito = [
    {
        "departamento": "HUANUCO",
        "provincia": "HUANUCO",
        "distritos": [
            "SAN PABLO DE PILLAO"
        ]
    }
]
const geoNoAcogidoDistrito = obtenerFiltradoData(noAcogidoDistrito)
L.geoJSON(geoNoAcogidoDistrito, {
    style: {
        color: 'cadetblue',
        weight: 6
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("NO ACOGIDO", feature));
    }
}).addTo(map);



// ---------------------------------
const filtroL31A = [
    {
        "departamentos": ["LORETO", "MADRE DE DIOS", "UCAYALI", "AMAZONAS", "SAN MARTIN"]
    }
]
const geoL31A = obtenerFiltradoData(filtroL31A)
L.geoJSON(geoL31A, {
    style: {
        color: 'green',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - a)", feature));
    }
}).addTo(map);


// ---------------------------------
const filtroL31B = [
    {
        "distritos": ["SIVIA", "AYAHUANCO", "LLOCHEGUA", "CANAYRE"],
        "provincia": "HUANTA",
        "departamento": "AYACUCHO"
    },
    {
        "distritos": ["AYNA", "SAN MIGUEL", "SANTA ROSA", "SAMUGARI"],
        "provincia": "LA MAR",
        "departamento": "AYACUCHO"
    }
]
const geoL31B = obtenerFiltradoData(filtroL31B)
L.geoJSON(geoL31B, {
    style: {
        color: 'orange',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - Art.3.1 - b) | Art.1 L29525 | Art.1 L30399", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31C = [
    {
        "provincias": ["JAEN", "SAN IGNACIO"],
        "departamento": "CAJAMARCA"
    }
]
const geoL31C = obtenerFiltradoData(filtroL31C)
L.geoJSON(geoL31C, {
    style: {
        color: 'blue',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - Art.3.1 - c)", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31D = [
    {
        "distritos": ["YANATILE"],
        "provincia": "CALCA",
        "departamento": "CUSCO"
    },
    {
        "provincias": ["LA CONVENCION"],
        "departamento": "CUSCO"
    },
    {
        "distritos": ["KOSÑIPATA"],
        "provincia": "PAUCARTAMBO",
        "departamento": "CUSCO"
    },
    {
        "distritos": ["CAMANTI", "MARCAPATA"],
        "provincia": "QUISPICANCHI",
        "departamento": "CUSCO"
    },

]
const geoL31D = obtenerFiltradoData(filtroL31D)
L.geoJSON(geoL31D, {
    style: {
        color: 'red',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - Art.3.1 - c)", feature));
    }
}).addTo(map);
// ---------------------------------
// ---------------------------------
const filtroL31E27759 = [
    {
        "departamento": "HUANUCO",
        "provincias": [
            "LEONCIO PRADO",
            "PUERTO INCA",
            "MARAÑON",
            "PACHITEA"
        ]
    },
    {
        "departamento": "HUANUCO",
        "provincia": "HUANUCO",
        "distritos": [
            "CHURUBAMBA", "SANTA MARIA DEL VALLE", "CHINCHAO", "HUANUCO", "AMARILIS", "PILLCO MARCA"
        ]
    },
    {
        "departamento": "HUANUCO",
        "provincia": "HUAMALIES",
        "distritos": [
            "MONZON"
        ]
    },
    {
        "departamento": "HUANUCO",
        "provincia": "AMBO",
        "distritos": [
            "CONCHAMARCA", "TOMAY KICHWA", "AMBO"
        ]
    }

]

const geoL31E27759 = obtenerFiltradoData(filtroL31E27759)
L.geoJSON(geoL31E27759, {
    style: {
        color: 'purple',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - e) | LEY 27759", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31F = [
    {
        "departamento": "JUNIN",
        "provincias": [
            "CHANCHAMAYO",
            "SATIPO"
        ]
    }
]
const geoL31F = obtenerFiltradoData(filtroL31F)
L.geoJSON(geoL31F, {
    style: {
        color: 'darkred',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - f) | LEY27759 Art.5 y Art.6", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31G = [
    {
        "departamento": "PASCO",
        "provincias": [
            "OXAPAMPA"
        ]
    }
]
const geoL31G = obtenerFiltradoData(filtroL31G)
L.geoJSON(geoL31G, {
    style: {
        color: 'blue',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - g) | LEY 27759 Art. 5 y Art. 6", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31H = [
    {
        "departamento": "PUNO",
        "provincia": "CARABAYA",
        "distritos": [
            "COASA", "AYAPATA", "ITUATA", "OLLACHEA", "SAN GABAN"
        ]
    }, {
        "departamento": "PUNO",
        "provincia": "SANDIA",
        "distritos": [
            "SAN JUAN DEL ORO", "LIMBANI", "YANAHUAYA", "PHARA", "ALTO INAMBARI", "SANDIA", "PATAMBUCO"
        ]
    }
]
const geoL31H = obtenerFiltradoData(filtroL31H)
L.geoJSON(geoL31H, {
    style: {
        color: 'darkred',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - h) | LEY 27759 Art. 5 y Art. 6", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31I = [
    {
        "departamento": "HUANCAVELICA",
        "provincia": "TAYACAJA",
        "distritos": [
            "HUACHOCOLPA", "TINTAY PUNCU"
        ]
    }
]
const geoL31I = obtenerFiltradoData(filtroL31I)
L.geoJSON(geoL31I, {
    style: {
        color: 'blue',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - i) | LEY 27759 Art. 5 y Art. 6", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31J = [
    {
        "departamento": "LA LIBERTAD",
        "provincia": "PATAZ",
        "distritos": [
            "ONGON"
        ]
    }
]
const geoL31J = obtenerFiltradoData(filtroL31J)
L.geoJSON(geoL31J, {
    style: {
        color: 'red',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - j) | LEY 27759 Art. 5 y Art. 6", feature));
    }
}).addTo(map);

// ---------------------------------
const filtroL31K = [
    {
        "departamento": "PIURA",
        "provincia": "HUANCABAMBA",
        "distritos": [
            "EL CARMEN DE LA FRONTERA"
        ]
    }
]
const geoL31K = obtenerFiltradoData(filtroL31K)
L.geoJSON(geoL31K, {
    style: {
        color: 'red',
        weight: 3
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(getPopUp("LEY 27037 - ART. 3.1 - j) | LEY 27759 Art. 5 y Art. 6", feature));
    }
}).addTo(map);







// let dataProvi = {}
// for (const provinciFeature of geojsonDataProvincias.features) {
//     dataProvi[provinciFeature.properties.NOMBRE] = provinciFeature.properties.CODIGO
// }
// console.log(JSON.stringify(dataProvi))

// let dataDepartamentos = {}
// for (const departamentoFeature of geojsonDataDepartamentos.features) {
//     dataDepartamentos[departamentoFeature.properties.NOMBRE] = departamentoFeature.properties.DPTO
// }
// console.log(JSON.stringify(dataDepartamentos))



// ARTICULO 3.1 A
// const art3P1A = geojsonDataDepartamentos.features.filter(feature => {
//     const depas = ["LORETO", "MADRE DE DIOS", "UCAYALI", "AMAZONAS", "SAN MARTIN"]
//     const nombreDepa = feature.properties.NOMBRE;
//     return depas.includes(nombreDepa)
// })
// // console.log("art3P1A")
// // console.log(JSON.stringify(art3P1A))


// L.geoJSON(art3P1A, {
//     style: {
//         color: 'green',
//         weight: 3
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`
//                     <strong> ART. 3.1 - a)</strong><br>
//                     DEPARTAMENTO: ${feature.properties.NOMBRE} <br>
//                 `);
//     }
// }).addTo(map);





// const pronvinciasFiltrado = geojsonDataProvincias.features.filter(feature => {
//     const nombreProvincia = feature.properties.NOMBRE;
//     const DPTO = feature.properties.DPTO;

//     const provinciasCajamarca = ["JAEN", "SAN IGNACIO"]

//     if (DPTO == "06" && provinciasCajamarca.includes(nombreProvincia)) {
//         return true
//     }

//     return false

// })

// L.geoJSON(pronvinciasFiltrado, {
//     style: {
//         color: 'blue',
//         weight: 3
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`
//                     <strong>${feature.properties.NOMBRE}</strong><br>
//                     PROVINCIA: ${feature.properties.NOMBRE}<br>
//                     DEPARTAMENTO: ${feature.properties.DEPARTAMEN}<br>
//                 `);
//     }
// }).addTo(map);

// const distritosFiltrado = geojsonDataDistritos.features.filter(feature => {


//     const nombreDistrito = feature.properties.NOMBRE;
//     const DPTO = feature.properties.DPTO;
//     const PROV = feature.properties.PROV;

//     const distriHuanta = ["SIVIA", "AYAHUANCO", "LLOCHEGUA", "CANAYRE"]
//     const distriLamar = ["AYNA", "SAN MIGUEL", "SANTA ROSA", "SAMUGARI"]


//     if (DPTO == "05" && PROV == "0504" && distriHuanta.includes(nombreDistrito)) {
//         return true
//     }

//     if (DPTO == "05" && PROV == "0505" && distriLamar.includes(nombreDistrito)) {
//         return true
//     }

//     return false

// })





// L.geoJSON(distritosFiltrado, {
//     style: {
//         color: 'orange',
//         weight: 3
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`
//                     <strong>${feature.properties.NOMBRE}</strong><br>
//                     Distrito: ${feature.properties.NOMBRE}<br>
//                 `);
//     }
// }).addTo(map)





// [ ["PE-34A","AREQUIPA"],["PE-1S","AREQUIPA"]]
/**
 * 
 * @param {*} propiedad 
 * @param {Array<String>} filtroArreglo 
 * @returns 
 */
function colorPropertie(propiedad, filtroArreglo) {

    // console.log(filtroArreglo)

    const arregloCodigos = filtroArreglo.map(item => item[0]);

    const modeloSinEfecto = {
        color: 'blue',
        weight: 1
    }

    if (!arregloCodigos.includes(propiedad.cCodRuta)) {
        return modeloSinEfecto
    }

    const arregloProvincias = filtroArreglo.map(item => item[1]);
    if (!arregloProvincias.includes(propiedad.cDepartame)) {
        return modeloSinEfecto
    }

    for (let index = 0; index < filtroArreglo.length; index++) {
        const filtro = filtroArreglo[index];

        if (propiedad.cCodRuta == filtro[0] && propiedad.cDepartame == filtro[1]) {
            return {
                color: 'green',
                weight: 4
            }
        }
    }
    return modeloSinEfecto
}

function getPopUp(ley, feature) {

    const DPTO = feature.properties.DPTO

    const PROV = feature.properties.PROV
    const CODIGO = feature.properties.CODIGO

    if (PROV != null && CODIGO != null) {

        const provincia = provinciasCodigoNombre[PROV]
        const departamento = depatamentoCodigoNombre[DPTO]


        return `
            <strong>${ley}</strong><br>
            DISTRITO: ${feature.properties.NOMBRE}<br>
            PROVINCIA: ${provincia} <br>
            DEPARTAMENTO: ${departamento} <br>
        `
    } else if (PROV == null) {
        if (CODIGO != null) {
            return `
            <strong>${ley}</strong><br>
            PROVINCIA: ${feature.properties.NOMBRE}<br>
            DEPARTAMENTO: ${feature.properties.DEPARTAMEN} <br>
            `
        } else {
            return `
            <strong>${ley}</strong><br>
            DEPARTAMENTO: ${feature.properties.NOMBRE}<br>
            `
        }
    }

    return `
        <strong>ERROR - Comunicar al administrador</strong><br>
    `
}


/**
 * 
 * @param {Object[]} objetosFiltro - Array de objetos Filtros
 * @param {String[]?} objetosFiltro[].distritos - Array de distritos
 * @param {String[]?} objetosFiltro[].provincias - Array de provincias
 * @param {String[]?} objetosFiltro[].departamentos - Array de departamentos
 * @param {String?} objetosFiltro[].provincia - Pronvicia Unica
 * @param {String?} objetosFiltro[].departamento - Departamento Unica
 */
function obtenerFiltradoData(objetosFiltro) {

    let rptFeature = []

    for (const filtro of objetosFiltro) {
        if (filtro.distritos != null) {
            const distritos = filtro.distritos;
            const provincia = provinciasNombreCodigos[filtro.provincia];
            const departamento = depatamentoNombreCodigos[filtro.departamento];
            console.log(`provincia ${provincia} | departamento ${departamento}`)
            const nuevoArrayFiltro = geojsonDataDistritos.features.filter(feature => {
                return (
                    feature.properties.PROV == provincia &&
                    feature.properties.DPTO == departamento &&
                    distritos.includes(feature.properties.NOMBRE)
                )
            })
            rptFeature = rptFeature.concat(nuevoArrayFiltro)
        } else if (filtro.provincias != null) {
            const provincias = filtro.provincias;

            const nuevoArrayFiltro = geojsonDataProvincias.features.filter(feature => {
                return (
                    feature.properties.DEPARTAMEN == filtro.departamento &&
                    provincias.includes(feature.properties.NOMBRE)
                )
            })
            rptFeature = rptFeature.concat(nuevoArrayFiltro)
        } else {
            const departamentos = filtro.departamentos
            const nuevoArrayFiltro = geojsonDataDepartamentos.features.filter(feature => {
                return (
                    departamentos.includes(feature.properties.NOMBRE)
                )
            })
            rptFeature = rptFeature.concat(nuevoArrayFiltro)
        }
    }

    return rptFeature
}





