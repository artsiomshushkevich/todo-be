export const colors = [
    '#1abc9c', // turquoise
    '#2ecc71', // emerald
    '#3498db', // peter river
    '#9b59b6', // amethyst
    '#34495e', // wet asphalt
    '#16a085', // green sea
    '#27ae60', // nephritis
    '#2980b9', // belize hole
    '#8e44ad', // wisteria
    '#2c3e50' // midnight blue
];

export const generateRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};
