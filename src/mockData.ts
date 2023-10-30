const l1Visa = {
    "id": 1,
    "name": "L-1A"
}

const o1Visa = {
    "id": 2,
    "name": "O-1A"
}

const eb1Visa = {
    "id": 3,
    "name": "EB-1A"
}

const h1bVisa = {
    "id": 4,
    "name": "H-1B"
}

const i765Visa = {
    "id": 5,
    "name": "I-765"
}

const e3Visa = {
    "id": 6,
    "name": "E-3Transfer"
}

export const response = {
    "total_clients": 4,
    "current_page": 1,
    "clients_per_page": 10,
    "data": [
        {
            "id": 1,
            "fullname": "Emma Roberts",
            "last_active": "2023-10-20T15:30:00Z",
            "company": {
                "id": 1,
                "name": "ABC Company"
            },
            "visas": [
                l1Visa,
                o1Visa,
                eb1Visa
            ]
        },
        {
            "id": 2,
            "fullname": "Fabian Ramirez",
            "last_active": "2023-10-24T15:30:00Z",
            "company": {
                "id": 2,
                "name": "Sunset Industries"
            },
            "visas": [
                h1bVisa
            ]
        },
        {
            "id": 3,
            "fullname": "Ted Mosbey",
            "last_active": "2023-09-21T15:30:00Z",
            "company": {
                "id": 3,
                "name": "Green Architecture"
            },
            "visas": [
                i765Visa,
                o1Visa
            ]
        },
        {
            "id": 4,
            "fullname": "Kira Mishra",
            "last_active": "2023-07-28T15:30:00Z",
            "company": {
                "id": 4,
                "name": "Fabrics Inc."
            },
            "visas": [
                e3Visa
            ]
        },
    ]
}