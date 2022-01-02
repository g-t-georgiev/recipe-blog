export const validationSchema = {
    title: {
        minLength: {
            value: 5,
            message: 'Title should be at least 5 characters long.'
        },
        maxLength: {
            value: 50,
            message: 'Title should be 50 characters long at maximum.'
        }
    },
    description: {
        minLength: {
            value: 15,
            message: 'Description should be at least 15 characters long.'
        },
        maxLength: {
            value: 3000,
            message: 'Desciprion should be 3000 characters long at maximum.'
        }
    },
    category: {
        includes: {
            value: ['Breakfast', 'Dinner', 'Dessert'],
            message: 'Invalid category.'
        }
    },
    imageUrl: {
        match: {
            value: /^https?:\/\//i,
            message: 'Invalid image URL.'
        }
    }
};