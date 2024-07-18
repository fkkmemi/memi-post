export interface Post {
  id: number
  title: string
  body: string
}

export const usePost = () => {
  const add = (posts: Post[]) => {
    posts.push({
      id: Math.random(),
      title: "Title " + Math.random().toString(36).substr(2, 9),
      body: "Body 1",
    })
  }

  const read = (posts: Post[]) => {
    // posts.push({
    //   id: Math.random().toString(36).substr(2, 9),
    //   title: "Title " + Math.random().toString(36).substr(2, 9),
    //   body: "Body 1",
    // })
  }

  const update = (post: Post) => {}

  const remove = (id: string) => {}

  return {
    add,
    read,
    update,
    remove,
  }
}
