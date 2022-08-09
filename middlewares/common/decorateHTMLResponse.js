// decorate html response middleware
const decorateHTMLResponse = (page_title)=>{
    return (req, res , next) => {
        res.locals.html = true;
        res.locals.title = page_title;
        next()
    }
}

// export
module.exports = decorateHTMLResponse;