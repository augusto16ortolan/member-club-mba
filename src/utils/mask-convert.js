export default function MaskInput(value) {
    value = value.replace(/\D/g, '');

    value = value.substring(0, 12);

    const parts = [];
    for (let i = 0; i < value.length; i += 3) {
        parts.push(value.substring(i, i + 3));
    }

    return parts.join('-');
}