import type { JSONContent } from '@tiptap/core'

export const findImagesFromContent = (json: JSONContent) => {
  const content = json.content

  if (!content) return []
  const cs = content.filter((c) => c.type === 'image' && c.attrs?.alt)
  if (!cs) return []
  const as = cs.map((c) => c.attrs)
  if (!as) return []
  return as
}

/*
{
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "aaaa"
                }
            ]
        },
        {
            "type": "paragraph"
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "bb"
                }
            ]
        },
        {
            "type": "image",
            "attrs": {
                "src": "https://firebasestorage.googleapis.com/v0/b/memi-post-3.appspot.com/o/userAttachments%2FDwVbBnz9s8XFtwelzz4pngDHFVG3%2FsRRSwx91nsTxQKsp0flI%2F%E3%85%8C%E3%85%8C%E3%85%8C%E3%84%B9%E3%84%B9.jpeg?alt=media&token=9ec512e9-5e0b-4136-8d2c-0e4ae974b6c5",
                "alt": null,
                "title": null
            }
        }
    ]
}
    */
