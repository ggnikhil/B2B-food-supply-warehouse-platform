import mongoose from "mongoose"

const productMasterSchema = new mongoose.Schema({
    "productId": {
        type: String,
        unique: true,
        required: [true, "Product id must be required"],
        trim: true
    },

    "productName": {
        type: String,
        unique:true,
        required: [true, "Product name is required"],
        trim: true
    },

    "displayName":{
        type:String,
        required:[true,"Display Name is must be required"],
        trim:true
    },

    "description": {
        type: String,
        required: [true, "Description is must be required"],
        trim: true
    },

    "classification": {
        "foodType": {
            type: String,
            enum: ["veg", "non-veg"],
            required: [true, "Food type is must be required"],
            trim: true
        },

        "zone": {
            type: String,
            required: true,
            trim: true,
            enum: ['FNV', 'AMBIENT', 'BULK', 'EGG', 'HIGHVALUE', 'POULTRY', 'FROZEN', 'RTS', 'ONION_POTATO', 'DAIRY']
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            enum: [
                "VEGETABLES",
                "FRUITS",
                "DAIRY_MILK_PRODUCTS",
                "EGGS",
                "POULTRY_MEAT",
                "FROZEN_FOODS",
                "GRAINS_PULSES_BULK",
                "SPICES_CONDIMENTS",
                "OIL_GHEE",
                "BAKERY",
                "BEVERAGES",
                "SNACKS_PACKAGED_FOOD",
                "ONION_POTATO",
                "HIGH_VALUE_ITEMS",
                "RTS_FROZEN_NONVEG"
            ]
        },

        "tags": {
            type: String,
            required: true,
            trim: true,
        }
    },

    "packaging": {
        "baseUnit": {
            type: String,
            required: true,
            trim: true,
            enum: ["kg", "g", "litre", "ml", "piece", "dozen", "packet", "bag", "box"]
        },

        "packSize": {
            type: String,
            required: true,
            trim: true,
        },

        "netWeightKg": {
            type: Number,
            required: true,
        },

        "grossWeightKg": {
            type: Number,
            required: true,
        }
    },

    "pricing": {
        "mrp": {
            type: Number,
            required: true
        },

        "sellingPrice": {
            type: Number,
            required: true
        },

        "gstRate": {
            type: Number,
            default: 0
        }
    },

    "compliance": {
        "shelfLifeDays": {
            type: Number,
            required: [true, "Shelf life day is must be required"],
        },
        "perishable": {
            type: Boolean,
            required: true,
        },
        "storageTemperature": {
            type: String,
            trim: true,
            default: "No storage temperature is required"
        }
    },

    "media": {
        "image": {
            type: [String],
            required: true,
        },

        "thumbnail": {
            type: String,
            required: true,
        }
    },

    "highlights": [
        {
            "label": {
                type: String
            },
            "value": {
                type: String
            }
        }
    ],

    "status": {
        "active": {
            type: Boolean,
            default: true
        },

        "isDeleted": {
            type: Boolean,
            default: false
        }
    }

}, {
    timestamps: true
});


export const productMasterModel = mongoose.model("Product", productMasterSchema)
