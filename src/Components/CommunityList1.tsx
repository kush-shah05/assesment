// src/CommunityList1.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import "../CommunityList.css"; // Import a separate CSS file for styling

interface Home {
  id: string;
  communityId: string;
  price: number;
  area: number;
  type: string;
}

interface Community {
  id: string;
  name: string;
  imgUrl: string;
  group: string;
}

const CommunityList1: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const communitiesResponse = await axios.get(
          "https://storage.googleapis.com/openhouse-ai-fe-coding-test/communities.json"
        );

        const homesResponse = await axios.get(
          "https://storage.googleapis.com/openhouse-ai-fe-coding-test/homes.json"
        );

        setCommunities(communitiesResponse.data);
        setHomes(homesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getAveragePrice = (communityId: string): number => {
    const communityHomes = homes.filter(
      (home) => home.communityId === communityId
    );
    const totalPrices = communityHomes.reduce(
      (sum, home) => sum + home.price,
      0
    );
    return communityHomes.length > 0 ? totalPrices / communityHomes.length : 0;
  };

  const getDefaultImage = (): string => {
    // Provide a default image URL
    return "https://assets-global.website-files.com/60a807564289c14d374c12f3/60a807564289c18b354c136c_full-logoAsset%2018.svg";
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    // Handle image error by setting the source to the default image
    const target = event.target as HTMLImageElement;
    target.src = getDefaultImage();
  };
  //
  return (
    <div className="container">
      <h1 className="heading">Calgary Community List</h1>

      <ul className="community-list">
        {communities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((community) => (
            <li key={community.id} className="community-item">
              <div className="community-content">
                <h3>{community.name}</h3>
                <img
                  alt={community.name}
                  className="community-image"
                  src={community.imgUrl || getDefaultImage()}
                  onError={handleImageError}
                />
                <h3 className="price">
                  Avg Price: ${getAveragePrice(community.id).toFixed(2)}
                </h3>
                <h3 className="grp-com">Group: {community.group}</h3>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommunityList1;
