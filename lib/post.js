import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join( process.cwd(), 'posts')
export function getSortedPostsData()
{
    //get filename under post
    const fileNames= fs.readdirSync(postDirectory)
    const allPostData = fileNames.map( (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')
        //read markdown file as string
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        //combine the data with id
        return {
            id, 
            ...matterResult.data
        }

    })

    //sort posts by date
    return allPostData.sort( ({date: a}, {date: b }) =>{
        if(a<b)
        {
            return 1
        }
        else if(a>b){
            return -1
        }
        else{
            return 0
        }
    } )
}