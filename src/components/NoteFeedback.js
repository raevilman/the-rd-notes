import { Link } from "gatsby";
import React from "react";
import { BasicEventCounter, IconEmoji } from "react-events-counter";
import "react-events-counter/dist/index.css";

function NoteFeedback({ frontmatter }) {
  return (
    <main className="px-4 py-4 sm:px-8 mt-6 rounded bg-content">
      <div className="flex justify-between">
        <div>
          <h3>Notes feedback</h3>
          <BasicEventCounter
          className="ec-feedback"
            assetId={frontmatter.slug}
            eventId="notes-feedback-likes"
            stepBy={1}
            text=" YES - I liked it &nbsp;"
            icon={<IconEmoji symbol="👍&nbsp;" label="views" />}
            // order={['text','icon','count']}
            formatCount={{
              template: "({count})",
              countPlaceholder: "{count}",
            }}
          />
          <BasicEventCounter
          className="ec-feedback"
            // className='counter'
            assetId={frontmatter.slug}
            eventId="notes-feedback-meh"
            stepBy={1}
            // dryRun={true}
            text="MEH &nbsp;"
            icon={<IconEmoji symbol="😑&nbsp;" label="views" />}
            formatCount={{
              template: "({count})",
              countPlaceholder: "{count}",
            }}
          />
          <BasicEventCounter
          className="ec-feedback"
            // className='counter'
            assetId={frontmatter.slug}
            eventId="notes-feedback-dislikes"
            stepBy={1}
            // dryRun={true}
            text="NOPE - I disliked it &nbsp;"
            icon={<IconEmoji symbol="👎&nbsp;" label="views" />}
            formatCount={{
              template: "({count})",
              countPlaceholder: "{count}",
            }}
          />
        </div>

        <div className="text-right">
          <h3>Follow</h3>
          <a href="https://twitter.com/raevilman" target="_blank">Follow on twitter!</a>
          
        </div>
      </div>
    </main>
  );
}

NoteFeedback.propTypes = {};

export default NoteFeedback;
