async function feed(parent, { filter, skip, first }, { prisma }, info) {
    const where = filter ? {
        OR: [
            { description_contains: filter },
            { url_contains: filter }
        ]
    } : {};

    return await prisma.links({ where, skip, first  });
}

module.exports = {
    feed
}