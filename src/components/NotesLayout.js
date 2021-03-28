import React from "react";
import Content from "./Content";
import Layout from "./Layout";
import { EventsCounter, IconEmoji } from "react-events-counter";
import "react-events-counter/dist/index.css";

function NotesLayout({ children, frontmatter, location }) {
  return (
    <>
      <Layout title={frontmatter.title}>
        <div className="flex justify-between text-invert">
          <div className="w-full flex justify-between">
            <h1>{frontmatter.title}</h1>
            <EventsCounter
              asset={frontmatter.title}
              event="page-views"
              application="theRDnotes"
              text="👁 &nbsp;"
              countOnLoad={true}
              className="flex "
            />
          </div>
        </div>
        <Content>{children}</Content>
        <Content>
          <h3>Helpful?</h3>
          <p>
            If you think this is helpful 🎈
            <br />
            Don't keep it to yourself 🙊 <br />
            <br />
            Share it with your <em>lovely</em> followers at{" "}
            <a
              href={
                "https://twitter.com/intent/tweet?text=Sharing an article I read, '" +
                frontmatter.title +
                "' by @raevilman &url=" +
                location.href
              }
              target="_blank"
              rel="noreferrer"
            >
              <span className="italic">twitter</span>
            </a>{" "}
            🗽
          </p>
        </Content>
        <Content>
          <h3>Feedback!</h3>
          <div className="">
            <EventsCounter
              asset={frontmatter.title}
              event="page-likes"
              application="theRDnotes"
              text=" YES - I liked it &nbsp;"
              formatCount="({count})"
              icon={
                <IconEmoji
                  symbol="👍&nbsp;"
                  label="views"
                  className="cursor-pointer"
                />
              }
              className="flex "
            />
            <EventsCounter
              asset={frontmatter.title}
              event="page-mehs"
              application="theRDnotes"
              text=" MEH &nbsp;"
              formatCount="({count})"
              icon={
                <IconEmoji
                  symbol="😐&nbsp;"
                  label="views"
                  className="cursor-pointer"
                />
              }
              className="flex "
            />
            <EventsCounter
              asset={frontmatter.title}
              event="page-dislikes"
              application="theRDnotes"
              text=" NOPE - I hate it &nbsp;"
              formatCount="({count})"
              icon={
                <IconEmoji
                  symbol="👎&nbsp;"
                  label="views"
                  className="cursor-pointer"
                />
              }
              className="flex "
            />
            <div className="flex justify-end">
              <span className="text-xs text-gray-600">
                powered by &nbsp;
                <a
                  href="https://eventscounter.com"
                  target="_blank"
                  rel="noreferrer"
                >EventsCounter.com</a>
              </span>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

//   NotesLayout.propTypes = {
//     children: PropTypes.node.isRequired,
//     title: PropTypes.string.isRequired,
//   };

export default NotesLayout;
