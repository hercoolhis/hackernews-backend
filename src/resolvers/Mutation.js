const bcrypt = require('bcryptjs'),
jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, { data }, { prisma }, info) {
    const password = await bcrypt.hash(data.password, 10);

    const user = await prisma.createUser({ ...data, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    }
}

async function login(parent, { data: {email, password} }, { prisma }, info) {

    const user = await prisma.user({ email });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    }
}

function post(parent, { url, description}, context, info) {
    const userId = getUserId(context);

    return context.prisma.createLink({
        url,
        description,
        postedBy: { connect: { id: userId } }
    })
}

async function vote(parent, args, context, info) {
    // 1
    const userId = getUserId(context)
  
    // 2
    const voteExists = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: args.linkId },
    })
    if (voteExists) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
  
    // 3
    return context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } },
    })
  }

module.exports = {
    signup,
    login,
    post,
    vote
}