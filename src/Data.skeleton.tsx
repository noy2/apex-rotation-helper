import styled from "@emotion/styled";

export default function DataSkeleton() {
  return (
    <MainFrame>
      <TitleBoxFrame>
        <Box />
        <Box style={{ width: "200px", height: "48px" }} />
        <ItemRow>
          <Aaa>
            <Box style={{ width: "136px", height: "32px" }} />
            <ItemGroupFrame>
              <ItemFrame>
                <Box style={{ width: "64px", height: "64px" }} />
                <Box style={{ width: "64px", height: "24px" }} />
              </ItemFrame>
              <ItemFrame>
                <Box style={{ width: "64px", height: "64px" }} />
                <Box style={{ width: "64px", height: "24px" }} />
              </ItemFrame>
            </ItemGroupFrame>
          </Aaa>
          <Aaa>
            <Box style={{ width: "136px", height: "32px" }} />
            <ItemGroupFrame>
              <ItemFrame>
                <Box style={{ width: "64px", height: "64px" }} />
                <Box style={{ width: "64px", height: "24px" }} />
              </ItemFrame>
              <ItemFrame>
                <Box style={{ width: "64px", height: "64px" }} />
                <Box style={{ width: "64px", height: "24px" }} />
              </ItemFrame>
            </ItemGroupFrame>
          </Aaa>
        </ItemRow>
      </TitleBoxFrame>
    </MainFrame>
  );
}

const Aaa = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemGroupFrame = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
`;

const ItemFrame = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 36px;
  right: 36px;
  gap: 16px;
`;

const Box = styled.div`
  width: 400px;
  height: 64px;
  background-color: #dddddd;
  border-radius: 4px;
`;

const TitleBoxFrame = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const MainFrame = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eeeeee;
`;
