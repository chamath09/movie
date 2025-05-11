/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  // Define dynamic colors for light and dark mode
  const textColor = useColorModeValue("black", "white"); // Primary text color
  const secondaryTextColor = useColorModeValue("gray.600", "green.200"); // Secondary text color
  const iconColor = useColorModeValue("gray.700", "green.300"); // Icon color

  const handleRemoveClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (link redirection)
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<CheckIcon />}
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            />
          </Tooltip>
        </Box>

        <Box>
          <Heading
            fontSize={{ base: "xl", md: "2xl" }}
            noOfLines={1}
            color={textColor}
          >
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={secondaryTextColor} mt="2">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <StarIcon fontSize={"small"} color={iconColor} />{" "}
            {/* Dynamic icon color */}
            <Text textAlign={"center"} fontSize="small" color={textColor}>
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text
            mt="4"
            fontSize={{ base: "xs", md: "sm" }}
            noOfLines={5}
            color={textColor}
          >
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
