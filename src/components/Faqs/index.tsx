import { styled } from '@material-ui/core';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { ThemeProps } from 'theme';
import IconGlobalStyleComponent from 'theme/GlobalComponent/iconGlobalStyleComponent';

const Logo = styled('img')({
  margin: 'auto',
  display: 'block',
  marginTop: 30,
});
const Div = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '7%',
});
const Text = styled('p')({
  color: '#BB36FF',
  marginLeft: 10,
  marginRight: 10,
  fontWeight: 'bold',
});
const H1 = styled('h1')({
  textAlign: 'center',
  marginTop: 20,
});

const P = styled('p')({
  color: 'black',
  marginLeft: 10,
  marginRight: 10,
  fontWeight: 'bold',
  textAlign: 'center',
  opacity: 0.3,
});
const PairLineChartData = styled('div')({
  width: '100%',
  marginTop: '3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Main = styled('div')({
  marginTop: 20,
  marginBottom: 20,
  '@media (min-width: 700px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 700px)': {
    width: '100%',
  },
});

const Entry = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '40%',
  '@media (max-width: 700px)': {
    width: '100%',
  },
});

const Information = styled('p')({
  marginLeft: 20,
});

const Hr = styled('hr')({
  width: '40%',
  margin: 'auto',
  display: 'block',
  opacity: 0.2,
});

const InputType = styled('div')({
  backgroundColor: '#f7f7f7',
  paddingLeft: 20,
  width: '38%',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 700px)': {
    width: '100%',
  },
});

const Input = styled('input')({
  width: '90%',
  padding: 10,
  backgroundColor: 'transparent',
  border: 'none',
});

const Ans = styled('p')({
  width: '30%',
  display: 'block',
  margin: 'auto',
});

const Tebdiv = styled('div')({
  '@media (min-width: 700px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@media (max-width: 700px)': {
    width: '90%',
    marginLeft: 20,
  },
});

const CustomTabs = styled(Tabs)({
  backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
  borderRadius: 100,
  '@media (max-width: 700px)': {
    width: '100%',
  },
});

const CustomTab = styled(Tab)((props: { isactive: boolean; theme?: ThemeProps }) => ({
  borderRadius: '100px!important',
  border: 'none!important',
  background: props.isactive && props.theme ? props.theme.palette.color?.active : '',
  color: props.isactive ? 'white!important' : '',
  fontWeight: 'bold',
  '@media (max-width: 700px)': {
    width: '33.33%',
  },
}));

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const Started = [
  "My funds are stuck on a Layer-2 network because i can't pay the gas needed for transactions.",
  'Can I access Hop Protocol through other interfaces than Plug.Exchange?',
  'Why can I not access Plug.exchange?',
  "Hop labels my transaction as completed but I can't see my tokens in Metamask!",
  'Do I need to pay transaction costs on the destination chain before I receive my tokens?',
  'What are the fees for transfering tokens with Hop?',
  'What is Plug Protocol?',
  'How safe is Plug?',
  'How long does a Hop transfer take?',
  "I sent a token but it's not arriving at the destination.",
];
const protocol = [
  'Can I access Hop Protocol through other interfaces than Plug.Exchange?',
  'Why can I not access Plug.exchange?',
  'Do I need to pay transaction costs on the destination chain before I receive my tokens?',
  'How safe is Plug?',
  'How long does a Hop transfer take?',
  "I sent a token but it's not arriving at the destination.",
];

const Exchange = [
  'Do I need to pay transaction costs on the destination chain before I receive my tokens?',
  'What are the fees for transfering tokens with Hop?',
  'What is Plug Protocol?',
  'How safe is Plug?',
  'How long does a Hop transfer take?',
  "I sent a token but it's not arriving at the destination.",
];
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(i: number) {
  return {
    id: `simple-tab-${i}`,
    'aria-controls': `simple-tabpanel-${i}`,
  };
}

const Faqs = () => {
  const [value, setValue] = React.useState(0);
  // const [collapse, setCollapse] = React.useState<any>([]);
  const [id, setid] = React.useState('');
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handle = (id: number) => {
  //   setCollapse([...collapse, id]);
  // };
  // const handlebutton = (id: number) => {
  //   const data = collapse.filter((item: any) => item !== id);
  //   setCollapse(data);
  // };

  return (
    <div>
      <Logo src="/logo.png" />
      <Div>
        <Text>Plug</Text> . <Text>FAQs</Text>
      </Div>
      <H1>Frequently Asked Questions</H1>
      <P>General questions about Plug and how to send tokens.</P>
      <PairLineChartData>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <Tebdiv>
              <CustomTabs
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <CustomTab isactive={value === 0} label="Item One" {...a11yProps(0)} />
                <CustomTab isactive={value === 1} label="Item Two" {...a11yProps(1)} />
                <CustomTab isactive={value === 2} label="Item Three" {...a11yProps(2)} />
              </CustomTabs>
            </Tebdiv>
          </Box>
          <TabPanel value={value} index={0}>
            <Main>
              <InputType>
                {/* <Search src="./images/icons/search.png" /> */}
                <IconGlobalStyleComponent
                  onClick={() => {}}
                  ml={0}
                  mr={0}
                  height={20}
                  width={20}
                  img="/images/icons/search.png"
                  opecity={0.3}
                />
                <Input type="text" placeholder="Search" />
              </InputType>
            </Main>
            {Started.map((val, i) => {
              return (
                <>
                  <Main key={i}>
                    <Entry>
                      <IconGlobalStyleComponent
                        onClick={() => {
                          setid(id === `collaps${i}` ? '' : `collaps${i}`);
                        }}
                        ml={10}
                        mr={0}
                        height={40}
                        width={40}
                        img={id === `collaps${i}` ? '/images/icons/collapsClose.png' : '/images/icons/plusIcon.png'}
                        opecity={id === `collaps${i}` ? 1 : 0.3}
                      />
                      <Information>{val}</Information>
                    </Entry>
                  </Main>
                  <Ans>
                    {id === `collaps${i}`
                      ? "If this happened to you do not despair, it's a common problem users face after bridging funds to a new network.<br />On every network you need to own the native gas token to pay for transaction fees. On Optimistic rollups like Arbitrum and Optimism the gas token is $ETH and on sidechains like Polygon and Gnosis chain the gas token is $MATIC and $xDAI respectively."
                      : null}
                  </Ans>
                  <br />
                  <Hr />
                </>
              );
            })}

            <Hr />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Main>
              <InputType>
                <IconGlobalStyleComponent
                  onClick={() => {}}
                  ml={0}
                  mr={0}
                  height={20}
                  width={20}
                  img="/images/icons/search.png"
                  opecity={0.3}
                />
                <Input type="text" placeholder="Search" />
              </InputType>
            </Main>
            {protocol.map((val, i) => {
              return (
                <>
                  <Main key={i}>
                    <Entry>
                      <IconGlobalStyleComponent
                        onClick={() => {
                          setid(id === `collaps${i}` ? '' : `collaps${i}`);
                        }}
                        ml={10}
                        mr={0}
                        height={40}
                        width={40}
                        img={id === `collaps${i}` ? '/images/icons/collapsClose.png' : '/images/icons/plusIcon.png'}
                        opecity={id === `collaps${i}` ? 1 : 0.3}
                      />
                      <Information>{val}</Information>
                    </Entry>
                  </Main>
                  <Ans>
                    {id === `collaps${i}`
                      ? "If this happened to you do not despair, it's a common problem users face after bridging funds to a new network.<br />On every network you need to own the native gas token to pay for transaction fees. On Optimistic rollups like Arbitrum and Optimism the gas token is $ETH and on sidechains like Polygon and Gnosis chain the gas token is $MATIC and $xDAI respectively."
                      : null}
                  </Ans>
                  <br />
                  <Hr />
                </>
              );
            })}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Main>
              <InputType>
                <IconGlobalStyleComponent
                  onClick={() => {}}
                  ml={0}
                  mr={0}
                  height={20}
                  width={20}
                  img="/images/icons/search.png"
                  opecity={0.3}
                />
                <Input type="text" placeholder="Search" />
              </InputType>
            </Main>
            {Exchange.map((val, i) => {
              return (
                <>
                  <Main key={i}>
                    <Entry>
                      <IconGlobalStyleComponent
                        onClick={() => {
                          setid(id === `collaps${i}` ? '' : `collaps${i}`);
                        }}
                        ml={10}
                        mr={0}
                        height={40}
                        width={40}
                        img={id === `collaps${i}` ? '/images/icons/collapsClose.png' : '/images/icons/plusIcon.png'}
                        opecity={id === `collaps${i}` ? 1 : 0.3}
                      />
                      <Information>{val}</Information>
                    </Entry>
                  </Main>
                  <Ans>
                    {id === `collaps${i}`
                      ? "If this happened to you do not despair, it's a common problem users face after bridging funds to a new network.<br />On every network you need to own the native gas token to pay for transaction fees. On Optimistic rollups like Arbitrum and Optimism the gas token is $ETH and on sidechains like Polygon and Gnosis chain the gas token is $MATIC and $xDAI respectively."
                      : null}
                  </Ans>
                  <br />
                  <Hr />
                </>
              );
            })}
          </TabPanel>
        </Box>
      </PairLineChartData>
    </div>
  );
};

export default Faqs;
