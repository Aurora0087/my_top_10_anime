'use client'

import React, { useEffect, useState, useRef, useCallback, ChangeEvent } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SwapyDragDrop from '@/components/SwapyDragDrop'
import PerspectiveText from '@/components/PerspectiveText'

interface Anime {
  id: number
  coverImage: {
    large: string
  }
}

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const query = gql`
  query ($page: Int) {
    Page(page: $page, perPage: 50) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        coverImage {
          large
        }
      }
    }
  }
`;

export default function Component() {

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedList, setSelectedList] = useState<Anime[]>([]);
  const [showText, setShowText] = useState('');

  const [isClicked, setIsClicked] = useState(false);

  const [clikedAnime, setClickedAnime] = useState(-1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const containerRef = useRef(null);

  const fetchAnime = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await client.query({
        query,
        variables: { page },
      });

      setAnimeList((prev) => {
        // Create a Set of existing anime IDs to check for duplicates
        const existingIds = new Set(prev.map((anime) => anime.id));

        // Filter out any media that is already in the list
        const newAnime = data.Page.media.filter(
          (anime: Anime) => !existingIds.has(anime.id)
        );

        return [...prev, ...newAnime];
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);




  useEffect(() => {
    fetchAnime()
  }, [])

  //

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchAnime()
      }
    }, options)

    if (loader.current) {
      observer.observe(loader.current)
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current)
      }
    }
  }, [fetchAnime])

  const columns: Anime[][] = [[], [], [], [], []]
  animeList.forEach((anime, index) => {
    columns[index % 5].push(anime)
  })

  const { scrollYProgress } = useScroll();

  // on click on img box

  function clickOnBox(id: number, img: string) {

    if (isClicked) {
      return
    }

    setIsClicked(true);
    // Check if the anime already exists in the selected list
    const exists = selectedList.some((anime) => anime.id === id);

    if (exists) {
      // If it exists, remove it from the list
      setSelectedList((prevList) => prevList.filter((anime) => anime.id !== id));
      setIsClicked(false);
      return
    } else {
      // If it doesn't exist, add it to the list

      if (selectedList.length === 0) {
        setShowText('greate start.');
      }
      else if (selectedList.length === 4) {
        setShowText('5 more to go.');
      }
      else if (selectedList.length === 9) {
        setShowText('ending credit.');
      }
      else if (selectedList.length === 10) {
        setShowText('List is completed.');
      }
      if (selectedList.length < 10) {
        setSelectedList((prevList) => [
          ...prevList,
          { id, coverImage: { large: img } },
        ]);

        // Highlight the clicked anime
        setClickedAnime(id);
      }

    }

    // Reset clickedAnime after 1.5 seconds
    setTimeout(() => {
      setClickedAnime(-1);
      setShowText('');
      setIsClicked(false);
    }, 2000);

  }

  return (
    <div ref={containerRef} className={`no-scrollbar relative min-h-screen max-w-screen ${clikedAnime !== -1 ? 'overflow-hidden' : ' overflow-y-scroll'} bg-[#0061fe]`}>

      <SerchAnime addTolist={clickOnBox} selectedList={selectedList} />

      <div className="p-4 mx-[0] grid grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
        {columns.map((column, columnIndex) => {
          const columnY = useTransform(scrollYProgress, [0, 1], [0, -250 * ((columnIndex + 1) % 2)])
          return (
            <motion.div
              key={columnIndex}
              className={`flex-1 transition-all ${columnIndex === 0 || columnIndex === 4 ? ' hidden md:block' : ' visible'}`}
              style={{ y: columnY }}
            >
              {column.map((anime: Anime) => {

                const index = selectedList.findIndex((list) => anime.id === list.id);
                return (
                  <motion.div
                    initial={{
                      rotateY: 180,
                    }}
                    animate={{
                      rotateY: 0,
                    }}
                    key={anime.id}
                    style={{
                      x: clikedAnime === -1 ? 0 : (clikedAnime === anime.id ? 0 : 1000 * (columnIndex < 2 ? -1 : 1)),
                      rotate: clikedAnime === -1 ? 0 : (clikedAnime === anime.id ? 8 * (columnIndex < 2 ? -1 : 1) : 0)
                    }}
                    whileHover={{
                      rotate: columnIndex < 2 ? -1 : 1,
                    }}
                    transition={{
                      ease: 'easeInOut',
                      duration: .5,
                    }}
                    className={`mb-4 transition bg-[#2600fe] rounded-xl relative aspect-[1/1.6] ${selectedList.length === 10 && index === -1 ? ' opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                    onClick={() => clickOnBox(anime.id, anime.coverImage.large)}
                  >


                    { // adding to list animation
                      clikedAnime !== -1 && clikedAnime === anime.id && <motion.div
                        initial={{
                          x: 0,
                          y: 0,
                          width: '100%',
                          opacity: 1,
                        }}
                        animate={{
                          x: (columnIndex === 0 || columnIndex === 4 ? 600 : (columnIndex === 1 || columnIndex === 3 ? 200 : 0)) * (columnIndex < 2 ? 1 : -1),
                          y: 1000,
                          width: '2.75rem',
                          rotate: 4 * (columnIndex < 2 ? 1 : -1),
                          opacity: 0
                        }}
                        transition={{
                          ease: 'easeInOut',
                          delay: .5,
                          duration: .4
                        }}
                        className=' absolute transition-all overflow-hidden shadow-lg rounded-xl w-11 lg:w-14 aspect-[1/1.6]'>
                        <img
                          src={anime.coverImage.large}
                          alt={`Anime cover ${anime.id}`}
                          className={`w-full h-full object-cover`}
                          loading="lazy"
                        />
                      </motion.div>}

                    {
                      index !== -1 &&
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -10,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          ease: 'easeIn',
                          delay: .5,
                          duration: .4,
                        }}
                        className={`transition text-[#0061fe] w-12 h-16 text-5xl px-1 py-2 absolute ${columnIndex < 2 ? 'rounded-bl-xl rounded-tr-xl right-0' : 'rounded-tl-xl rounded-br-xl left-0'} bg-[#fff429] z-50 grid place-content-center tracking-tighter`}
                      >
                        {index + 1}
                      </motion.div>
                    }


                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      style={{
                        x: clikedAnime === -1 ? 0 : (clikedAnime === anime.id ? 110 * (columnIndex < 2 ? 1 : -1) : 0),
                        y: clikedAnime === -1 ? 0 : (clikedAnime === anime.id ? 10 : 0),
                        rotate: clikedAnime === -1 ? 0 : (clikedAnime === anime.id ? 8 * (columnIndex < 2 ? -1 : 1) : 0)
                      }}
                      transition={{
                        ease: 'easeInOut',
                        delay: .5,
                      }}
                      className={`h-full w-full transition overflow-hidden rounded-xl relative border-4 border-[#0061fe] z-20 ${index !== -1 && 'border-[#fff429]'}`}>
                      <img
                        src={anime.coverImage.large}
                        alt={`Anime cover ${anime.id}`}
                        className={`w-full h-full object-cover transition hover:scale-105`}
                        loading="lazy"
                      />
                    </motion.div>

                  </motion.div>
                )
              })}
            </motion.div>
          )
        })}
      </div>
      <div ref={loader} className="h-[10vh] w-screen grid place-content-center text-[#fff429] capitalize" >
        Searching for Your top animes...
      </div>

      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: showText === '' ? '10vh' : '-30vh',
        }}
        transition={{
          ease: 'backIn',
          duration: .5,
        }}
        className={`fixed bottom-[0] transition text-5xl md:text-8xl font-extrabold ${selectedList.length < 10 ? 'text-stroke-yellow text-transparent' : ' text-[#fe00b0]'} w-full text-center uppercase z-50 pointer-events-none`}>
        {showText}
      </motion.div>
      <SelectedList list={selectedList} setList={setSelectedList} />
    </div>
  )
}


/* selected anime list */

function SelectedList({ list, setList }: { list: Anime[], setList: Function }) {

  const [isExpanded, setIsExpanded] = useState(false);

  function close() {
    setIsExpanded(false);
  }

  function open() {
    setIsExpanded(true);
  }

  function toggleExpand() {
    setIsExpanded((isExpanded) => (!isExpanded))
  }
  return (
    <motion.div
      animate={{
        height: isExpanded ? '100vh' : 'auto',
      }}
      className={` fixed bottom-0 w-screen h-fit lg:px-16 flex justify-center items-end z-[9999] ${isExpanded ? 'pointer-events-auto bg-slate-800/50' : 'pointer-events-none'}`}>
      <motion.div
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
          height: isExpanded ? '90vh' : 'auto',
          width: isExpanded ? '100vw' : 'auto',
        }}
        transition={{
          ease: 'easeInOut',
          duration: .5,
        }}
        whileHover={{
          width: isExpanded ? '100vw' : '80vw',
        }}
        className={`h-fit bg-[#fff429] relative transition rounded-t-xl flex flex-col items-center pointer-events-auto z-[99999] overflow-hidden`}>

        <motion.div
          animate={{
            width: isExpanded ? '8rem' : '4rem',
          }}
          transition={{
            ease: 'easeInOut',
            duration: .5,
          }}
          onClick={toggleExpand}
          className='h-1 rounded-full transition bg-[#2600fe] w-16 mt-2 cursor-pointer'></motion.div>

        {
          list.length === 10 && !isExpanded &&
          <motion.div
            initial={{
              height: 0,
              scale: 0,
            }}
            animate={{
              height: 'auto',
              scale: 1,
            }}
            transition={{
              ease: 'easeInOut',
              duration: .5,
            }}
            onClick={open}
            className='text-[#fff429] transition rounded-full bg-[#2600fe] px-8 py-2 mt-2 cursor-pointer'>
            <PerspectiveText label={"next"} />
          </motion.div>}

        {
          // close button
          isExpanded &&
          <motion.button
            initial={{
              rotate: 0,
              scale: 0,
            }}
            animate={{
              rotate: 225,
              scale: 1,
            }}
            whileHover={{
              rotate: 45,
              scale: 1.1,
            }}
            transition={{
              ease: 'easeInOut',
              duration: 1.2,
            }}
            onClick={close}
            className=' absolute top-6 right-6 border-2 border-[#fe00b0] rounded-full aspect-square w-16 md:w-[10vw] flex justify-center items-center pointer-events-auto'>
            <div className=' relative w-[80%] h-[80%] flex justify-center items-center'>
              <Image width={500} height={500} src="/x.svg" alt="" className=' w-full h-full object-cover' />
            </div>
          </motion.button>}
        {
          // change itmes place, delete from list, direct to next route
          isExpanded && list.length > 0 &&
          <motion.div
            initial={{
              y: 1000,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              ease: 'easeInOut',
              duration: .5,
            }}

            className=' w-full transition-all h-fit absolute top-[20vw] md:top-[12vw] left-0'
          >
            <div className=' relative w-full h-fit'>
              <SwapyDragDrop cards={list} setCards={setList} />
            </div>

          </motion.div>
        }
        <motion.div
          animate={{
            y: isExpanded ? 1000 : 0,
            opacity: isExpanded ? 0 : 1,
          }}
          transition={{
            ease: 'easeInOut',
            duration: .5,
          }}
          onClick={open}
          className='grid grid-cols-5 sm:grid-cols-10 justify-center items-center p-2 gap-2 w-full md:w-fit cursor-pointer'>
          {
            Array.from({ length: 10 }).map((_, i) => {

              const anime = list[i];
              return (
                <motion.div
                  key={i}
                  className='text-black border border-[#2600fe] rounded md:rounded-lg w-9 lg:w-14 aspect-[5/7] overflow-hidden'>
                  {anime?.coverImage?.large && (
                    <motion.div
                      initial={{
                        scale: 0,
                        height: 0,
                        width: 0,
                      }}
                      animate={{
                        scale: 1,
                        height: 'auto',
                        width: 'auto',
                      }}
                      transition={{
                        ease: 'easeInOut',
                        delay: 1,
                      }}
                      className=' relative w-full h-full'
                    >
                      <div className='bg-[#2600fe] text-white px-1 absolute top-0 right-0 rounded-bl-lg tracking-tighter text-xs lg:text-base'>
                        {i + 1}
                      </div>
                      <img
                        src={anime.coverImage.large}
                        alt={`Anime cover ${anime.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )
            })
          }
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


/* serch Anime */

interface SerchAnimeProps {
  addTolist: Function;
  selectedList: Anime[];
}

function SerchAnime({ addTolist, selectedList }: SerchAnimeProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [serchedAnimeList, setSerchedAnimeList] = useState<Anime[]>([]);

  // Toggle search bar expansion and handle button clicks
  async function serchButtonHandeler(): Promise<void> {
    if (!isExpanded) {
      setIsExpanded(true);
    } else if (isExpanded && searchText.length < 1) {
      setIsExpanded(false);
      setSerchedAnimeList([])
    } else {
      // Search anime by title in AniList
      try {
        const res = await client.query({
          query: gql`
            query ($search: String) {
              Page(page: 1, perPage: 5) {
                media(search: $search, type: ANIME) {
                  id
                  coverImage {
                    large
                  }
                }
              }
            }
          `,
          variables: {
            search: searchText,
          },
        });
        console.log(res);
        

        const results: Anime[] = res.data.Page.media.map(
          (media: any) => ({
            id: media.id,
            coverImage: media.coverImage,
          })
        );

        setSerchedAnimeList(results);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    }
  }

  // Handle input text changes
  function onInputChanger(event: ChangeEvent<HTMLInputElement>): void {
    setSearchText(event.target.value);
  }

  return (
    <motion.div className="fixed flex-col top-4 w-full flex justify-center items-center z-[999999999999999999] pointer-events-none">
      <div className="bg-[#0061fe] w-fit flex rounded-full pointer-events-auto">
        {/* Search input */}
        <AnimatePresence>
          {isExpanded && (
            <motion.input
              value={searchText}
              onChange={onInputChanger}
              animate={{
                width: ["0vw", "25vw"],
                opacity: [0, 1],
              }}
              exit={{
                width: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.3 }}
              className="rounded-l-full bg-[#0061fe] text-[#fff429] pl-2 border-y border-l border-[#fff429] outline-none"
              placeholder="Search anime..."
            />
          )}
        </AnimatePresence>

        {/* Clear text button */}
        <AnimatePresence>
          {searchText.length > 0 && (
            <motion.div
              onClick={() => {setSearchText(""); setSerchedAnimeList([])}}
              animate={{
                scale: [0, 1],
                rotate: [0, 45],
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: 0,
                width: 0,
              }}
              whileHover={{
                rotate: 135,
              }}
              transition={{ duration: 0.2 }}
              className="transition w-12 h-12 overflow-hidden rounded-full cursor-pointer flex items-center justify-center"
            >
              <img src="/x2.svg" alt="Clear" className="w-6 h-6 object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search button */}
        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={serchButtonHandeler}
          className="w-12 h-12 rounded-full bg-[#fff429] grid place-content-center overflow-hidden cursor-pointer"
        >
          <img src="/search.svg" alt="Search" className="w-6 h-6 object-cover" />
        </motion.button>
      </div>

      {/* Display searched anime list */}
      <AnimatePresence>
        {serchedAnimeList.length > 0 && isExpanded && (
          <motion.div
            animate={{
              height: [0, "auto"],
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-full p-4 m-4 rounded-xl bg-[#fff429] h-fit grid gap-8 place-content-center grid-cols-3 md:grid-cols-5 pointer-events-auto"
          >
            {serchedAnimeList.map((anime) => {
              const index = selectedList.findIndex(
                (list) => anime.id === list.id
              );

              return (
                <motion.div
                  key={anime.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  onClick={() =>
                    addTolist(anime.id, anime.coverImage.large)
                  }
                  className={`h-full w-full transition overflow-hidden rounded-xl relative border-4 cursor-pointer ${
                    index === -1
                      ? "border-transparent"
                      : " border-[#0061fe]"
                  } aspect-[1/1.6] z-20`}
                >
                  <img
                    src={anime.coverImage.large}
                    alt={`Anime cover of ${anime.id}`}
                    className="w-full h-full object-cover transition hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}