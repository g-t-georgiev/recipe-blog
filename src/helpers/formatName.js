const formatName = function (name) {
    if (!name) return;
    return name
        .split(' ')
        .map(
            s => s[0].toUpperCase() + s.slice(1)
        )
        .join(' ');
    // return category[0].toUpperCase() + category.slice(1);
}

export default formatName;