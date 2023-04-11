export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'Posted By',
            type: 'postedBy',
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'string',
        },
        {
            name: 'postedOn',
            title: 'Posted On',
            type: 'string',
            readOnly: true,
        },
    ]
}