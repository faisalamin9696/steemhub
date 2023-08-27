import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';


interface LinkTabProps {
    label: string;
    value: string;
    href: string;
    handleOnClick: (value: string) => void;
}

const homeTabs = (slug: string) => [
    { label: 'Discussion', value: 'blogs', href: `/${slug}` },
    { label: 'Comments', value: 'comments', href: `/${slug}/comments` },
    { label: 'Followers', value: 'followers', href: `/${slug}/followers` },
    { label: 'Followings', value: 'followings', href: `/${slug}/followings` },
    { label: 'Wallet', value: 'wallet', href: `/${slug}/wallet` },

]

// '!px-0 !text-start
//      !normal-case !justify-start !items-start '
function LinkTab(props: LinkTabProps) {

    return (<Tab className=' !normal-case !justify-start '
        component={Link}
        to={props.href}
        label={props.label}

        value={props.value}
        onClick={() => {
            props.handleOnClick(props.value);
        }}

    />
    );
}

function UserProfileTabs() {
    const params = useParams();
    const { category: username } = params


    const [tabValue, setTabValue] = useState('blogs');
    const handleTabChange = (value: string) => {
        setTabValue(value);
    };

    const customTabIndicatorProps = {
        style: {
            bottom: 8,
            display: "flex",
            justifyContent: "space-between",
        },
       

    };

    return (
        <div className='w-full  px-2'>

            <div className='w-full lg:max-w-5xl m-auto'>
                <div className='relative 
                m-auto'>
                    <Tabs TabIndicatorProps={customTabIndicatorProps}
                        className='lg:ml-[200px] !text-start
                        sm:ml-0 lg:w-full !h-[46px] ' value={tabValue}

                    >
                        {homeTabs(username!).map((tab, index) => {
                            return <LinkTab
                                handleOnClick={handleTabChange}

                                {...tab} />
                        })}
                    </Tabs>
                </div>
            </div>

        </div>
    )
}

export { UserProfileTabs }
