// HomeTabs.tsx
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import "../CommunityList.css"; 

interface Home {
  id: string;
  communityId: string;
  price: number;
  area: number;
  type: string;
}

const Houses: React.FC = () => {
  const [homes, setHomes] = useState<Home[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homesResponse = await axios.get(
          'https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json'
        );
        setHomes(homesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filterHomesByType = (type: string): Home[] => {
    return homes.filter((home) => home.type === type);
  };

  return (
    <div className='home-card'>
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab label="House" />
        <Tab label="Townhome" />
        <Tab label="Duplex" />
        <Tab label="Condo" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <Typography variant="h6">House Listings</Typography>
        {filterHomesByType('House').map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Typography variant="h6">Townhome Listings</Typography>
        {filterHomesByType('Townhome').map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Typography variant="h6">Duplex Listings</Typography>
        {filterHomesByType('Duplex').map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <Typography variant="h6">Condo Listings</Typography>
        {filterHomesByType('Condo').map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </TabPanel>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

interface HomeCardProps {
  home: Home;
}

const HomeCard: React.FC<HomeCardProps> = ({ home }) => {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Typography variant="h6">{`Price: $${home.price}, Area: ${home.area}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default Houses;
