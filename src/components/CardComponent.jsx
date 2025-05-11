/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { StarIcon } from "@chakra-ui/icons";

const CardComponent = ({ item, type }) => {
  // Define dynamic colors for light and dark mode
  const overlayBgColor = useColorModeValue(
    "rgba(255,255,255,0.9)",
    "rgba(0,0,0,0.9)"
  );
  const textColor = useColorModeValue("black", "white");
  const secondaryTextColor = useColorModeValue("gray.600", "green.200");

  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1)x", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name}
          height={"100%"}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          bg={overlayBgColor} // Dynamic background color
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"} color={textColor}>
            {" "}
            {/* Dynamic text color */}
            {item?.title || item?.name}
          </Text>
          <Text
            textAlign={"center"}
            fontSize={"x-small"}
            color={secondaryTextColor} // Dynamic secondary text color
          >
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} color={secondaryTextColor} />{" "}
            {/* Dynamic icon color */}
            <Text color={textColor}>{item?.vote_average?.toFixed(1)}</Text>{" "}
            {/* Dynamic text color */}
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent;
