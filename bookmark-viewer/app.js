import { BOOKMARK_COLLECTIONS } from './bookmarks.js';

const bookmarksElement = document.querySelector("bookmarks");

if (BOOKMARK_COLLECTIONS.length == 0) {
    bookmarksElement.innerHTML = "<section>you don't have any bookmarks.</section>";
}

BOOKMARK_COLLECTIONS.forEach(bookmarkCollection => {
    const titleElement = document.createElement("h2");
    const listElement = document.createElement("ul");

    titleElement.innerText = bookmarkCollection.name;

    bookmarkCollection.bookmarks.forEach(bookmark => {
        const listItem = document.createElement("li");

        listItem.innerHTML = "<a href='" + bookmark.url + "' target='_blank' rel='noopener noreferrer'>" + bookmark.name + "</a>";

        listElement.append(listItem);
    });

    bookmarksElement.append(titleElement);
    bookmarksElement.append(listElement);
});
