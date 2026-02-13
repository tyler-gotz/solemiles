import { GRID_COLUMNS } from "@/constants/gridColumns"
import { Card, Grid, GridItem, Skeleton, SkeletonText, Stack } from "@chakra-ui/react"
import type React from "react"

const SkeletonGrid: React.FC = () => (
    <Grid templateColumns={GRID_COLUMNS} gap={6}>
        {[1, 2, 3].map((i) => (
            <GridItem key={i}>
                <Card.Root>
                    <Card.Header>
                        <Skeleton height="20px" width="70%" mb={2} />
                        <SkeletonText noOfLines={1} />
                    </Card.Header>
                    <Card.Body>
                        <Stack gap={2}>
                            <Skeleton height="16px" width="50%" />
                            <Skeleton height="16px" width="60%" />
                        </Stack>
                    </Card.Body>
                </Card.Root>
            </GridItem>
        ))}
    </Grid>
)

export default SkeletonGrid