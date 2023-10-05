


const nextPrevUrlGenerator = (offset, limit, totalHeroes) => {

    const offsetNext = Number(offset) + Number(limit);
    const offsetPrev = Number(offset) - Number(limit);

    const next = offsetNext < totalHeroes
        ? nextPrevBuilderUrl(limit, offsetNext)
        : null;

    const prev = offsetPrev >=0
        ? nextPrevBuilderUrl(limit, offsetPrev)
        : null;

    return {
        next:next,
        prev:prev
    }
}


const nextPrevBuilderUrl = (limit, offset) => {
    return `${process.env.DOMAIN}/api-heroes/v1/heroes?limit=${limit}&offset=${offset}`
}

module.exports={
    nextPrevUrlGenerator
}
