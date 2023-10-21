import striptags from 'striptags';
import { Remarkable } from 'remarkable';

const remarkable = new Remarkable({ html: true });
const ellipsis = require('text-ellipsis');

function decodeEntities(body: string): string {
    return body.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

interface BodyShortProps {
    className?: string;
    body?: string;
    length?: number;
}

const BodyShort = (props: BodyShortProps): JSX.Element => {

    let body = striptags(remarkable.render(striptags(decodeEntities(props.body || ''))));
    body = body.replace(/(?:https?|ftp):\/\/[\S]+/g, '');

    // If body consists of whitespace characters only skip it.
    if (!body.replace(/\s/g, '').length) {
        return <></>;
    }

    /* eslint-disable react/no-danger */
    return (
        <div
            className={props.className}
            dangerouslySetInnerHTML={{ __html: ellipsis(body, props.length || 140, { ellipsis: '…' }) }
            }
        />
    )
};


BodyShort.defaultProps = {
    className: '',
    body: '',
    length: 140,
};

export default BodyShort;
