import { Scrollbars } from 'react-custom-scrollbars';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Dropdown, Menu } from 'antd';
import STooltip from '../STooltip';
import { FaQuoteLeft, FaItalic, FaBold, FaHeading, FaLink, FaFileImage } from 'react-icons/fa';
import MainWrapper from '../wrapper/MainWrapper';

const tooltip = (description: string, shortcut: string) => (
    <span>
        {description}
        <br />
        <b>{shortcut}</b>
    </span>
);

interface ToolbarProps {
    intl: any,
    onSelect: any,
    style?: any
}
const EditorToolbar = (props: ToolbarProps) => {
    const { intl, onSelect } = props;
    const menu = (
        <Menu
            onClick={(e: any) => onSelect(e.key)}>
            <Menu.Item key="h1">
                <h1>
                    <FormattedMessage id="heading_1" defaultMessage="Heading 1" />
                </h1>
            </Menu.Item>
            <Menu.Item key="h2">
                <h2>
                    <FormattedMessage id="heading_2" defaultMessage="Heading 2" />
                </h2>
            </Menu.Item>
            <Menu.Item key="h3">
                <h3>
                    <FormattedMessage id="heading_3" defaultMessage="Heading 3" />
                </h3>
            </Menu.Item>
            <Menu.Item key="h4">
                <h4>
                    <FormattedMessage id="heading_4" defaultMessage="Heading 4" />
                </h4>
            </Menu.Item>
            <Menu.Item key="h5">
                <h5>
                    <FormattedMessage id="heading_5" defaultMessage="Heading 5" />
                </h5>
            </Menu.Item>
            <Menu.Item key="h6">
                <h6>
                    <FormattedMessage id="heading_6" defaultMessage="Heading 6" />
                </h6>
            </Menu.Item>
        </Menu>
    );

    return (
        <Scrollbars
            style={{ width: '100%', height: 40 }}
            universal
            autoHide
            renderView={({ style, ...props }) => (
                <div className='ring-1 m-1'  {...props} />
            )}
        >

            <div className=" space-x-1">
                <Dropdown overlay={menu}>
                    <Button className='border-none' >
                        <FaHeading />
                    </Button>
                </Dropdown>
                <STooltip
                    title={tooltip(intl.formatMessage({ id: 'bold', defaultMessage: 'Add bold' }), 'Ctrl+b')}
                >
                    <Button className='border-none' onClick={() => onSelect('b')}>
                        <FaBold />
                    </Button>
                </STooltip>
                <STooltip
                    title={tooltip(
                        intl.formatMessage({ id: 'italic', defaultMessage: 'Add italic' }),
                        'Ctrl+i',
                    )}
                >
                    <Button className='border-none' onClick={() => onSelect('i')}>
                        <FaItalic />
                    </Button>
                </STooltip>
                <STooltip
                    title={tooltip(
                        intl.formatMessage({ id: 'quote', defaultMessage: 'Add quote' }),
                        'Ctrl+q',
                    )}
                >
                    <Button className='border-none' onClick={() => onSelect('q')}>
                        <FaQuoteLeft />
                    </Button>
                </STooltip>
                <STooltip
                    title={tooltip(intl.formatMessage({ id: 'link', defaultMessage: 'Add link' }), 'Ctrl+k')}
                >
                    <Button className='border-none' onClick={() => onSelect('link')}>
                        <FaLink />
                    </Button>
                </STooltip>
                <STooltip
                    title={tooltip(
                        intl.formatMessage({ id: 'image', defaultMessage: 'Add image' }),
                        'Ctrl+m',
                    )}
                >
                    <Button className='border-none' onClick={() => onSelect('image')}>
                        <FaFileImage />
                    </Button>
                </STooltip>
            </div>
        </Scrollbars>
    );
};


export default injectIntl(EditorToolbar);
