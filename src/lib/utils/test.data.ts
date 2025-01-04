export const tourTestData = JSON.parse(`{
    "status": "success",
    "code": 200,
    "message": "Successfully feteched documents.",
    "data": [
        {
            "name": "Explore the Grand Canyon",
            "location": {
                "name": "Grand Canyon",
                "city": "Arizona",
                "country": "USA",
                "address": "Grand Canyon National Park",
                "location": {
                    "latitude": 36.1069,
                    "longitude": -112.1129
                }
            },
            "price": 300,
            "durationDays": 3,
            "discount": 5,
            "numberOfSeats": 30,
            "description": "Marvel at the breathtaking views of the Grand Canyon with expert guides.",
            "isAvailable": false,
            "date": {
                "_seconds": 1740009600,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Helicopter Tour",
                    "durationHours": 2,
                    "location": {
                        "name": "South Rim",
                        "city": "Arizona",
                        "country": "USA",
                        "address": "Helicopter Base",
                        "location": {
                            "_latitude": 36.1069,
                            "_longitude": -112.1129
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1740042000,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1740049200,
                            "_nanoseconds": 0
                        },
                        "type": "Helicopter"
                    },
                    "accommodation": {
                        "type": "Camp",
                        "name": "Canyon Camp"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "id": "TOUR123",
            "guide": "TgupNT9l75vO9n2a6s69"
        },
        {
            "id": "IV4Dt4XQt0VIfJ4zSi8z",
            "name": "Northern Lights in Iceland",
            "location": {
                "name": "Reykjavik",
                "city": "Reykjavik",
                "country": "Iceland",
                "address": "Aurora Viewing Base",
                "location": {
                    "latitude": 64.1355,
                    "longitude": -21.8954
                }
            },
            "price": 800,
            "durationDays": 3,
            "discount": 15,
            "numberOfSeats": 12,
            "description": "Witness the stunning Northern Lights in the breathtaking landscapes of Iceland.",
            "date": {
                "_seconds": 1741564800,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Aurora Viewing",
                    "durationHours": 2,
                    "location": {
                        "name": "Viewing Point",
                        "city": "Reykjavik",
                        "country": "Iceland",
                        "address": "Aurora Base",
                        "location": {
                            "_latitude": 64.1355,
                            "_longitude": -21.8954
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1741636800,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1741644000,
                            "_nanoseconds": 0
                        },
                        "type": "Bus"
                    },
                    "accommodation": {
                        "type": "Cabin",
                        "name": "Aurora Lodge"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "isAvailable": true,
            "guide": "TgupNT9l75vO9n2a6s69"
        },
        {
            "id": "cFkWHazcaiwHnS1qdg4m",
            "name": "Discover the Pyramids of Giza",
            "location": {
                "name": "Giza",
                "city": "Cairo",
                "country": "Egypt",
                "address": "Giza Plateau",
                "location": {
                    "latitude": 29.9792,
                    "longitude": 31.1342
                }
            },
            "price": 350,
            "durationDays": 1,
            "discount": 10,
            "numberOfSeats": 50,
            "description": "Explore the ancient pyramids and learn about Egypt's rich history.",
            "isAvailable": true,
            "date": {
                "_seconds": 1743811200,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Guided Pyramid Tour",
                    "durationHours": 3,
                    "location": {
                        "name": "Pyramid Base",
                        "city": "Cairo",
                        "country": "Egypt",
                        "address": "Tourist Center",
                        "location": {
                            "_latitude": 29.9792,
                            "_longitude": 31.1342
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1743840000,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1743850800,
                            "_nanoseconds": 0
                        },
                        "type": "Bus"
                    },
                    "accommodation": {
                        "type": "Hotel",
                        "name": "Giza Inn"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "guide": "TgupNT9l75vO9n2a6s69"
        },
        {
            "id": "fjTILqh2pX7EapDWk0KU",
            "name": "Adventure in the Alps",
            "location": {
                "name": "Alps",
                "city": "Innsbruck",
                "country": "Austria",
                "address": "Mountain Retreat",
                "location": {
                    "latitude": 47.2692,
                    "longitude": 11.4041
                }
            },
            "price": 499.99,
            "durationDays": 7,
            "discount": 10,
            "numberOfSeats": 20,
            "description": "Experience the majestic beauty of the Alps with guided hikes and breathtaking views.",
            "isAvailable": true,
            "date": {
                "_seconds": 1733011200,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Hiking",
                    "durationHours": 5,
                    "location": {
                        "name": "Mountain Trail",
                        "city": "Innsbruck",
                        "country": "Austria",
                        "address": "123 Mountain Rd",
                        "location": {
                            "_latitude": 47.2692,
                            "_longitude": 11.4041
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1733047200,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1733061600,
                            "_nanoseconds": 0
                        },
                        "type": "Bus"
                    },
                    "accommodation": {
                        "type": "Hotel",
                        "name": "Mountain Lodge"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "guide": "TgupNT9l75vO9n2a6s69"
        },
        {
            "id": "fq4rtuj0bWjqwpK1C0fe",
            "name": "Venice Gondola Ride",
            "location": {
                "name": "Venice",
                "city": "Venice",
                "country": "Italy",
                "address": "Grand Canal",
                "location": {
                    "latitude": 45.4408,
                    "longitude": 12.3155
                }
            },
            "price": 200,
            "durationDays": 1,
            "discount": 5,
            "numberOfSeats": 10,
            "description": "Enjoy a romantic gondola ride through the picturesque canals of Venice.",
            "isAvailable": true,
            "date": {
                "_seconds": 1747699200,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Gondola Ride",
                    "durationHours": 1,
                    "location": {
                        "name": "Grand Canal",
                        "city": "Venice",
                        "country": "Italy",
                        "address": "Canal Base",
                        "location": {
                            "_latitude": 45.4408,
                            "_longitude": 12.3155
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1747731600,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1747735200,
                            "_nanoseconds": 0
                        },
                        "type": "Boat"
                    },
                    "accommodation": {
                        "type": "Hotel",
                        "name": "Canal View Inn"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "guide": "TgupNT9l75vO9n2a6s69"
        },
        {
            "id": "tcKnXCBHdvnrxrAFbl9Y",
            "name": "Safari in Serengeti",
            "location": {
                "name": "Serengeti",
                "city": "Arusha",
                "country": "Tanzania",
                "address": "Serengeti National Park",
                "location": {
                    "latitude": -2.3333,
                    "longitude": 34.8333
                }
            },
            "price": 750,
            "durationDays": 5,
            "discount": 15,
            "numberOfSeats": 15,
            "description": "Discover the wild beauty of Africa with a guided safari in the Serengeti.",
            "isAvailable": false,
            "date": {
                "_seconds": 1736899200,
                "_nanoseconds": 0
            },
            "activities": {
                "1": {
                    "id": 1,
                    "name": "Game Drive",
                    "durationHours": 6,
                    "location": {
                        "name": "Main Park",
                        "city": "Arusha",
                        "country": "Tanzania",
                        "address": "Wildlife Trail",
                        "location": {
                            "_latitude": -2.3333,
                            "_longitude": 34.8333
                        }
                    },
                    "transportation": {
                        "arrivalTime": {
                            "_seconds": 1736928000,
                            "_nanoseconds": 0
                        },
                        "departureTime": {
                            "_seconds": 1736949600,
                            "_nanoseconds": 0
                        },
                        "type": "Jeep"
                    },
                    "accommodation": {
                        "type": "Lodge",
                        "name": "Wildlife Lodge"
                    }
                }
            },
            "images": [
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg",
                "https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=johan-mouchet-Z95viY3WaZs-unsplash.jpg"
            ],
            "guide": "TgupNT9l75vO9n2a6s69"
        }
    ]
}`)['data'];
