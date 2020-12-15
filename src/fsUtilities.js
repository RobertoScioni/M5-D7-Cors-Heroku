const {
	readJSON,
	writeJSON,
	pathExists,
	ensureFile,
	readJson,
} = require("fs-extra")
const { join } = require("path")
const uniqId = require("uniqid")

const booksPath = join(__dirname, "./services/books/books.json")
const commentPath = join(__dirname, "./services/comments/")

const readDB = async (filePath) => {
	try {
		const fileJson = await readJSON(filePath)
		return fileJson
	} catch (error) {
		throw new Error(error)
	}
}

const writeDB = async (filePath, fileContent) => {
	try {
		await writeJSON(filePath, fileContent)
	} catch (error) {
		throw new Error(error)
	}
}

const appendcomment = async (bookid, comment) => {
	let path = join(commentPath, bookid + ".json")
	ensureFile(path)
	console.log("bookid ", bookid, " comment ", comment, " path ", path)
	let comments = []
	try {
		comments = await readJSON(path)
	} catch (error) {
		console.log("comments now ", comments)
		console.error(error)
	}
	console.log(comments)
	comment.id = uniqId()
	comments.push(comment)
	console.log("comments to save ", comments)
	try {
		writeJSON(path, comments)
	} catch (error) {
		console.error(error)
	}
}

const getComments = async (bookId) => {
	let path = join(commentPath, bookId + ".json")
	try {
		let result = await readJson(path)
		return result
	} catch (error) {
		console.log("no such files")
		return error
	}
}

const deleteComments = async (bookId, commentId) => {
	let path = join(commentPath, bookId + ".json")
	let comments = []
	console.log(comments)
	try {
		comments = await readJSON(path)
		console.log("---")
		comments = comments.filter((comment) => comment.id !== commentId)
		writeJSON(path, comments)
	} catch (error) {
		console.log("not fount")
		console.log(comments)
		console.error(error)
	}
}

module.exports = {
	getBooks: async () => readDB(booksPath),
	writeBooks: async (booksData) => writeDB(booksPath, booksData),
	appendcomment,
	getComments,
	deleteComments,
}
