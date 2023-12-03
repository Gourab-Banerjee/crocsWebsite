
   export const menuQuery = `{
      categoryList(filters: {ids:{eq: "467"}}) {
        uid,
        name,
        id,
        level,
        children_count
        children {
          id
          level
          name
          path
          url_path
          url_key
          image
          description
          children {
            id
            level
            name
            path
            url_path
            url_key
            image
            description
          }
        }
      }
    }`;

    