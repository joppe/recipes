type TextField = 'text';

const recipe = {
    name: 'recipe',
    verson: '1.0.0',
    properties: {
        title: {
            type: 'text',
            required: true,
            default: 'bla',
        },
        ingredients: {
            type: 'array',
        },
    },
};

type Recipe = typeof recipe;


type PropertyDefinition = {
    type: string;
    required: boolean;
    default: string;
}


{
    "type": "array",
    "items": [
        {
            "type": "string",
            "enum": [],
        }
    ]
    "minItems": 2,
    "maxItems": 3
  }
